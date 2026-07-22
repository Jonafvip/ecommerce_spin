from api.models.user import User
from api.serializers.user_serializer import UserCreateSerializer, UserDetailSerializer
from rest_framework.generics import ListCreateAPIView


class UserAPIView(ListCreateAPIView):
    serializer_class = UserDetailSerializer

    def get_queryset(self):
        return User.objects.filter(is_active=True)

    def get_serializer_class(self):
        if self.request.method == "POST":
            return UserCreateSerializer
        return self.serializer_class
