from django.urls import include, path
from .views.product_view import ProductViewSet
from .views.category_view import CategoryViewSet
from .views.order_view import OrderViewSet
from .views.user_view import (
    UserCreateAPIView,
    UserRetrieveAPIView,
    UserListByAdminAPIView,
)
from .views.cart_view import CartViewSet
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register(r"products", ProductViewSet, basename="products")
router.register(r"categories", CategoryViewSet, basename="categories")
router.register(r"orders", OrderViewSet, basename="orders")
router.register(r"carts", CartViewSet, basename="carts")

urlpatterns = [
    path("user/register/", UserCreateAPIView.as_view(), name="user-register"),
    path("user/me/", UserRetrieveAPIView.as_view(), name="user-me"),
    path("users/admin/", UserListByAdminAPIView.as_view(), name="user-admin"),
    path("", include(router.urls)),
]
