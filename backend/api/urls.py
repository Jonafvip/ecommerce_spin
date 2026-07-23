from django.urls import include, path
from ecommerce_spin.backend.api.views.product_view import ProductViewSet
from ecommerce_spin.backend.api.views.category_view import CategoryViewSet
from ecommerce_spin.backend.api.views.order_view import OrderViewSet
from ecommerce_spin.backend.api.views.user_view import UserCreateAPIView, UserRetrieveAPIView
from ecommerce_spin.backend.api.views.cart_view import CartViewSet
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register(r"products", ProductViewSet, basename="products")
router.register(r"categories", CategoryViewSet, basename="categories")
router.register(r"orders", OrderViewSet, basename="orders")
router.register(r"carts", CartViewSet, basename="carts")

urlpatterns = [
    path("user/register/", UserCreateAPIView.as_view(), name="user-register"),
    path("user/me/", UserRetrieveAPIView.as_view(), name="user-me"),
    path("", include(router.urls))
]
