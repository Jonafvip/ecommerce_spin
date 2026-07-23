from rest_framework import viewsets, status
from api.models.order import Order
from api.serializers.order_serializer import OrderListSerializer, OrderCreateSerializer
from rest_framework.permissions import (
    IsAuthenticated,
)
from api.permissions import IsAdmin, IsCustomer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.select_related("user")
    serializer_class = OrderListSerializer
    permission_classes = [IsAuthenticated]

    serializer_actions = {
        "list": OrderListSerializer,
        "create": OrderCreateSerializer,
    }

    serializer_permissions = {
        "list": [IsAuthenticated],
        "create": [IsAuthenticated],
        "destroy": [IsAdmin],
    }

    def get_permissions(self):
        return self.serializer_permissions.get(self.action, super().get_permissions())

    def get_queryset(self):
        user = self.request.user
        if user.role == "ADMIN":
            return Order.objects.all()
        return Order.objects.filter(user=user)

    def get_serializer_class(self):
        return self.serializer_actions.get(self.action, super().get_serializer_class())

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
