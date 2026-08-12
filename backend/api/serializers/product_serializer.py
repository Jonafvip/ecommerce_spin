from rest_framework import serializers
from ..models.product import Product
from ..models.category import Category
from .category_serializer import CategoryListSerializer


class ProductListSerializer(serializers.ModelSerializer):
    category = CategoryListSerializer(read_only=True)

    class Meta:
        model = Product
        fields = ["id", "name", "unit_price", "category"]


class ProductListAdminSeriliazer(serializers.ModelSerializer):
    category = CategoryListSerializer(read_only=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "unit_price",
            "description",
            "stock",
            "category",
            "product_code",
            "image",
            "is_active",
        ]


class ProductDetailSerializer(serializers.ModelSerializer):
    category = CategoryListSerializer(read_only=True)

    class Meta:
        model = Product
        fields = "__all__"


class ProductCreateSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())

    class Meta:
        model = Product
        fields = "__all__"
        read_only_fields = ["id", "created_at", "updated_at"]

    def validate_stock(self, value):
        if value > 100000:
            raise serializers.ValidationError("El stock de inventario excede el limite")
        return value

    def validate_unit_price(self, value):
        if value > 100000:
            raise serializers.ValidationError("El precio del producto excede el limite")
        return value

    def validate_product_code(self, value):
        qs = Product.objects.filter(pruduct_code=value)
        if self.instance:
            qs = qs.exclude(pk=self.instance.pk)
        if qs.exists():
            raise serializers.ValidationError("El codigo de producto ya existe")
        return value
