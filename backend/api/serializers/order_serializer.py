from rest_framework import serializers
from ..models.order import Order
from ..models.order_detail import OrderDetail
from ..models.product import Product
from .user_serializer import UserListAuxSerializer
from .order_details_serializer import OrderDetailsReadProductSerializer
from django.db import transaction


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
            raise serializers.ValidationError(
                "La orden debe tener al menos un producto"
            )

        for detail in details:
            product = detail["product"]
            if product.stock < detail["quantity"]:
                raise serializers.ValidationError(
                    f"Stock insuficiente para {product.name}"
                )
        return data

    def create(self, validated_data):
        details_data = validated_data.pop("details")
        with transaction.atomic():
            order = Order.objects.create(**validated_data)

            for detail in details_data:
                product = Product.objects.select_for_update().get(
                    pk=detail["product"].pk
                )

                if product.stock < detail["quantity"]:
                    raise serializers.ValidationError(
                        f"Stock insuficiente para {product.name}"
                    )

                OrderDetail.objects.create(
                    order=order,
                    product=product,
                    quantity=detail["quantity"],
                    price=product.unit_price,
                )
                product.stock -= detail["quantity"]
                product.save(update_fields=["stock"])

            return order


class OrderListSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    total = serializers.SerializerMethodField()
    details = OrderDetailsReadProductSerializer(many=True)

    class Meta:
        model = Order
        fields = ["id", "status", "created_at", "user", "total", "details"]

    def get_user(self, obj):
        from .user_serializer import UserListAuxSerializer

        if obj.user:
            return UserListAuxSerializer(obj.user).data
        return None

    def get_total(self, obj):
        return sum(detail.total for detail in obj.details.all())
