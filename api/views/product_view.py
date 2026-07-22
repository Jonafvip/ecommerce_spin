from api.models.product import Product
from api.serializers.product_serializer import (ProductListSerializer,
                                                ProductCreateSerializer,
                                                ProductDetailSerializer)
from rest_framework.viewsets import ModelViewSet


class ProductViewSet(ModelViewSet):
    serializer_class = ProductListSerializer

    serializer_actions = {
        "list": ProductListSerializer,
        "create": ProductCreateSerializer,
        "retrieve": ProductDetailSerializer,
        "update": ProductDetailSerializer,
        "partial_update": ProductDetailSerializer
    }

    def get_queryset(self):
        return Product.objects.select_related("category").filter(is_active=True)

    def get_serializer_class(self):
        return self.serializer_actions.get(self.action, super().get_serializer_class())
