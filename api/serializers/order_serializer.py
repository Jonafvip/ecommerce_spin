from rest_framework import serializers
from api.models.order import Order
from api.models.user import User
from api.models.order_detail import OrderDetail


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
            if product.stock < details["quantity"]:
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


# Serializador Auxiliar
class UserListAuxSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["id", "full_name"]

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"


class OrderListSerializer(serializers.ModelSerializer):
    user = UserListAuxSerializer(read_only=True)

    class Meta:
        model = Order
        fields = ["id", "status", "created_at", "user"]
