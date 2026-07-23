from api.models.category import Category
from api.serializers.category_serializer import (
    CategoryListSerializer,
    CategoryCreateSerializer,
)
from rest_framework.viewsets import ModelViewSet
from api.permissions import IsAdminOrReadOnly


class CategoryViewSet(ModelViewSet):
    serializer_class = CategoryListSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        return Category.objects.filter(is_active=True)

    def get_serializer_class(self):
        if self.action == "create":
            return CategoryCreateSerializer
        elif self.action == "list":
            return CategoryListSerializer
        return CategoryListSerializer
