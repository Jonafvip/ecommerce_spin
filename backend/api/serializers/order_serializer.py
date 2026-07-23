from rest_framework import serializers
from ecommerce_spin.backend.api.models.order import Order
from ecommerce_spin.backend.api.models.order_detail import OrderDetail
from ecommerce_spin.backend.api.serializers.user_serializer import UserListAuxSerializer


class OrderDetailCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetail
        fields = ["product", "quantity"]


class OrderCreateSerializer(serializers.ModelSerializer):
    details = OrderDetailCreateSerializer(many=True)

    class Meta:
        model = Order
        fields = ["id", "status", "user", "details"]
        read_only_fields = ["id", "status", "created_at", "user"]

    def validate(self, data):
        details = data["details"]
        if not details:
            raise serializers.ValidationError("La orden debe tener al menos un producto")

        for detail in details:
            product = detail["product"]
            if product.stock < detail["quantity"]:
                raise serializers.ValidationError(
                    f"Stock insuficiente para {product.name}"
                )
        return data

    def create(self, validated_data):
        details_data = validated_data.pop("details")
        order = Order.objects.create(**validated_data)

        for detail in details_data:
            product = detail["product"]
            OrderDetail.objects.create(
                order=order,
                product=product,
                quantity=detail["quantity"],
                price=product.unit_price
            )
            product.stock -= detail["quantity"]
            product.save()
        return order


class OrderListSerializer(serializers.ModelSerializer):
    user = UserListAuxSerializer(read_only=True)

    class Meta:
        model = Order
        fields = ["id", "status", "created_at", "user"]
