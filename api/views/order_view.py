from rest_framework import viewsets, status
from api.models.order import Order
from api.serializers.order_serializer import OrderListSerializer, OrderCreateSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderListSerializer

    def get_serializer_class(self):
        if self.action == "POST":
            return OrderCreateSerializer
        return OrderListSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
