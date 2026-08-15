from rest_framework.viewsets import ModelViewSet
from ..models.cart import Cart
from ..models.product import Product
from ..models.cart_detail import CartDetail
from ..serializers.cart_serializer import CartCreateSerializer, CartListSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status


class CartViewSet(ModelViewSet):
    queryset = Cart.objects.select_related("user")
    serializer_class = CartListSerializer
    permission_classes = [IsAuthenticated]

    serializer_actions = {
        "list": CartListSerializer,
        "create": CartCreateSerializer,
    }

    def get_permissions(self):
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

    @action(detail=False, methods=["post"], url_path="add-item")
    def add_item(self, request):
        product_id = request.data.get("product_id")
        quantity = int(request.data.get("quantity", 1))

        if not product_id:
            return Response(
                {"error": "Se requiere product_id"}, status=status.HTTP_400_BAD_REQUEST
            )

        cart, _ = Cart.objects.get_or_create(user=request.user, status="ACTIVE")

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response(
                {"error": "El producto no existe"}, status=status.HTTP_404_NOT_FOUND
            )

        if product.stock < quantity:
            return Response(
                {"error": f"Stock insuficiente para {product.name}"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        detail, created = CartDetail.objects.get_or_create(
            cart=cart, product=product, defaults={"quantity": quantity}
        )

        if not created:
            new_quantity = detail.quantity + quantity
            if product.stock < new_quantity:
                return Response(
                    {
                        "error": f"Stock insuficiente. Solo quedan {product.stock} unidades"
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
            detail.quantity = new_quantity
            detail.save()
        return Response(
            {"message": "Producto añadido al carrito con exito"},
            status=status.HTTP_200_OK,
        )

    @action(detail=False, methods=["patch", "put"], url_path="update-quantity")
    def update_item_quantity(self, request):
        detaild_id = request.data.get("detail_id")
        quantity = request.data.get("quantity")

        if not detaild_id or quantity is None:
            return Response(
                {"error": "Se requieren detail_id  y quantity"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            quantity = int(quantity)
            if quantity < 1:
                return Response(
                    {"error": "Se requiere detail_id y quantity"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            item = CartDetail.objects.get(id=detaild_id, cart__user=request.user)

            if item.product.stock < quantity:
                return Response(
                    {
                        "error": f"Stock insuficiente.Solo quedan {item.product.stock} unidades"
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
            item.quantity = quantity
            item.save()

            return Response(
                {"message": "Cantidad actualizada correctamente"},
                status=status.HTTP_200_OK,
            )
        except CartDetail.DoesNotExist:
            return Response(
                {"error": "El detalle no existe o no te pertenece"},
                status=status.HTTP_404_NOT_FOUND,
            )

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
