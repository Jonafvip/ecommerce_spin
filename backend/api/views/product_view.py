from ..models.product import Product
from ..serializers.product_serializer import (
    ProductListSerializer,
    ProductCreateSerializer,
    ProductDetailSerializer,
    ProductListAdminSeriliazer,
)
from ..permissions import IsAdminOrReadOnly, IsAdmin
from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from ..filters import ProductFilter
from rest_framework.decorators import action


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.select_related("category").filter(is_active=True)
    serializer_class = ProductListSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = ProductFilter
    ordering_fields = ["name", "unit_price"]
    pagination_class = PageNumberPagination
    pagination_class.page_size = 9

    serializer_actions = {
        "list": ProductListSerializer,
        "create": ProductCreateSerializer,
        "retrieve": ProductDetailSerializer,
        "update": ProductCreateSerializer,
        "partial_update": ProductCreateSerializer,
        "get_list_products_admin": ProductListAdminSeriliazer,
    }

    def get_permissions(self):
        if self.action == "get_list_products_admin":
            return [IsAdmin()]
        return super().get_permissions()

    def get_queryset(self):
        return Product.objects.select_related("category").filter(is_active=True)

    def get_serializer_class(self):
        return self.serializer_actions.get(self.action, super().get_serializer_class())

    @action(detail=False, methods=["get"], url_path="list-products-admin")
    def get_list_products_admin(self, request):
        queryset = Product.objects.select_related("category").all()
        filter_queryset = self.filter_queryset(queryset)

        page = self.paginate_queryset(filter_queryset)
        if page is not None:
            return self.get_paginated_response(
                self.get_serializer(page, many=True).data
            )
        return Response(self.get_serializer(filter_queryset, many=True).data)
