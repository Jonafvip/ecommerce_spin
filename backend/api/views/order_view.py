from rest_framework import viewsets
from ..models.order import Order
from ..serializers.order_serializer import OrderListSerializer, OrderCreateSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from ..permissions import IsAdmin
from rest_framework.decorators import action
from rest_framework.response import Response


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.select_related("user")
    serializer_class = OrderListSerializer
    permission_classes = [IsAuthenticated]

    serializer_actions = {
        "list": OrderListSerializer,
        "create": OrderCreateSerializer,
    }

    def get_permissions(self):
        if self.action == "destroy":
            return [IsAdmin()]
        return super().get_permissions()

    def get_queryset(self):
        user = self.request.user
        if user.role == "ADMIN":
            return Order.objects.all()
        return Order.objects.filter(user=user)

    def get_serializer_class(self):
        return self.serializer_actions.get(self.action, super().get_serializer_class())

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=["get"], url_path="mine")
    def get_my_orders(self, request):
        queryset = Order.objects.filter(user=self.request.user)
        return Response(OrderListSerializer(queryset, many=True).data)
