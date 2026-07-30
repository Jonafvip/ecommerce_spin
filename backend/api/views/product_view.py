from ..models.product import Product
from ..serializers.product_serializer import (
    ProductListSerializer,
    ProductCreateSerializer,
    ProductDetailSerializer,
    ProductListAdminSeriliazer,
)
from ..permissions import IsAdminOrReadOnly
from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import PageNumberPagination, Response
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
        "update": ProductDetailSerializer,
        "partial_update": ProductDetailSerializer,
        "get_list_products_admin": ProductListAdminSeriliazer,
    }

    def get_queryset(self):
        return Product.objects.select_related("category").filter(is_active=True)

    def get_serializer_class(self):
        return self.serializer_actions.get(self.action, super().get_serializer_class())

    @action(detail=False, methods=["get"], url_path="list-products-admin")
    def get_list_products_admin(self, request):
        queryset = Product.objects.select_related("category").all()
        filter_queryset = self.filter_queryset(queryset)

        page = self.paginate_queryset(filter_queryset)
        if page is None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(filter_queryset, many=True)
        return Response(serializer.data)
