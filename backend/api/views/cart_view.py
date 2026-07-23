from rest_framework.viewsets import ModelViewSet
from ecommerce_spin.backend.api.models.cart import Cart
from ecommerce_spin.backend.api.serializers.cart_serializer import CartCreateSerializer, CartListSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny


class CartViewSet(ModelViewSet):
    queryset = Cart.objects.select_related("user")
    serializer_class = CartListSerializer
    permission_classes = [IsAuthenticated]

    serializer_actions = {
        "list": CartListSerializer,
        "create": CartCreateSerializer,
    }

    def get_permissions(self):
        if self.action == "create":
            return [AllowAny()]
        return [IsAuthenticated()]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Cart.objects.filter(user=self.request.user)
        return Cart.objects.none()

    def get_serializer_class(self):
        return self.serializer_actions.get(self.action, super().get_serializer_class())

    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            serializer.save(user=self.request.user)
        else:
            serializer.save()
