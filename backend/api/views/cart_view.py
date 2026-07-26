from rest_framework.viewsets import ModelViewSet
from ..models.cart import Cart
from ..models.cart_detail import CartDetail
from ..serializers.cart_serializer import CartCreateSerializer, CartListSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status


class CartViewSet(ModelViewSet):
    queryset = Cart.objects.select_related("user")
    serializer_class = CartListSerializer
    permission_classes = [AllowAny]

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

    @action(detail=False, methods=["delete"], url_path="remove-item")
    def remove_item(self, request):
        detail_id = request.data.get("detail_id")

        if not detail_id:
            return Response(
                {"error": "Se requiere detail_id"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            item = CartDetail.objects.get(id=detail_id, cart__user=request.user)
            item.delete()
            return Response(
                {"message": "Producto eliminado del carrito"},
                status=status.HTTP_204_NO_CONTENT,
            )
        except CartDetail.DoesNotExist:
            return Response(
                {"error": "El detalle no existe o no te pertenece"},
                status=status.HTTP_404_NOT_FOUND,
            )
