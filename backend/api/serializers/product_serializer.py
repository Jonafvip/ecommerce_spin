from rest_framework import serializers
from ..models.product import Product
from .category_serializer import CategoryListSerializer


class ProductListSerializer(serializers.ModelSerializer):
    category = CategoryListSerializer(read_only=True)

    class Meta:
        model = Product
        fields = ["id", "name", "unit_price", "category"]


class ProductDetailSerializer(serializers.ModelSerializer):
    category = CategoryListSerializer(read_only=True)

    class Meta:
        model = Product
        fields = "__all__"


class ProductCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"
        read_only_fields = ["id", "created_at", "updated_at"]

    def validate_stock(self, value):
        if value > 100000:
            raise serializers.ValidationError(
                {"stock": "El stock de inventario excede el limite"}
            )
        return value

    def validate_unit_price(self, value):
        if value > 100000:
            raise serializers.ValidationError(
                {"unit_price": "El precio del producto excede el limite"}
            )
        return value
