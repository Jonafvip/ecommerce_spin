from ..models.user import User
from ..serializers.user_serializer import (
    UserCreateSerializer,
    UserDetailSerializer,
    UserListByAdminSerializer,
    UserUpdateSerializer,
)
from rest_framework.generics import (
    CreateAPIView,
    RetrieveUpdateAPIView,
    ListAPIView,
)
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination
from django.db.models import Count


class UserCreateAPIView(CreateAPIView):
    serializer_class = UserCreateSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = Token.objects.get(user=user)
        return Response(
            {"user": UserDetailSerializer(user).data, "token": token.key},
            status=status.HTTP_201_CREATED,
        )


class UserRetrieveAPIView(RetrieveUpdateAPIView):
    serializer_class = UserDetailSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def get_serializer_class(self):
        if self.request.method in ("PUT", "PATCH"):
            return UserUpdateSerializer
        return UserDetailSerializer

class UserListByAdminAPIView(ListAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserListByAdminSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    ordering_fields = ["username"]
    pagination_class = PageNumberPagination
    pagination_class.page_size = 10

    def get_queryset(self):
        return (
            User.objects.filter(is_active=True)
            .filter(role="CUSTOMER")
            .annotate(orders_count=Count("orders"))
        )
