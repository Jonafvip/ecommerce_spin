from rest_framework import serializers
from ecommerce_spin.backend.api.models.cart import Cart
from ecommerce_spin.backend.api.models.cart_detail import CartDetail
from ecommerce_spin.backend.api.serializers.user_serializer import UserListAuxSerializer


class CartDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartDetail
        fields = ["product", "quantity"]


class CartCreateSerializer(serializers.ModelSerializer):
    details = CartDetailSerializer(many=True)

    class Meta:
        model = Cart
        fields = ["id", "status", "user", "details"]
        read_only_fields = ["id", "status", "created_at"]

    def validate(self, data):
        details = data["details"]
        if not details:
            raise serializers.ValidationError(
                "El carrito debe contener almenos 1 productos"
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
        cart = Cart.objects.create(**validated_data)

        for detail in details_data:
            product = detail["product"]
            CartDetail.objects.create(
                quantity=detail["quantity"], cart=cart, product=product
            )
        return cart


class CartListSerializer(serializers.ModelSerializer):
    user = UserListAuxSerializer(read_only=True, allow_null=True)

    class Meta:
        model = Cart
        fields = ["id", "status", "user"]
