from ..models.product import Product
from ..serializers.product_serializer import (
    ProductListSerializer,
    ProductCreateSerializer,
    ProductDetailSerializer,
)
from ..permissions import IsAdminOrReadOnly
from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from ..filters import ProductFilter


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
    }

    def get_queryset(self):
        return Product.objects.select_related("category").filter(is_active=True)

    def get_serializer_class(self):
        return self.serializer_actions.get(self.action, super().get_serializer_class())
