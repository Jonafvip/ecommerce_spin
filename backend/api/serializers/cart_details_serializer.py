from ..models.cart_detail import CartDetail
from rest_framework import serializers


class CartDetailReadProductSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)
    product_image = serializers.ImageField(source="product.image", read_only=True)
    product_price = serializers.DecimalField(
        source="product.unit_price", max_digits=10, decimal_places=2, read_only=True
    )
    product_description = serializers.CharField(
        max_length=255, source="product.description", read_only=True
    )

    class Meta:
        model = CartDetail
        fields = [
            "id",
            "product",
            "product_name",
            "product_description",
            "product_image",
            "product_price",
            "quantity",
            "total",
        ]
