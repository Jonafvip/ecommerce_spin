from rest_framework import serializers
from ..models.order_detail import OrderDetail


class OrderDetailsReadProductSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)
    product_image = serializers.ImageField(source="product.image", read_only=True)

    class Meta:
        model = OrderDetail
        fields = [
            "id",
            "product",
            "product_name",
            "product_image",
            "quantity",
            "total",
        ]
