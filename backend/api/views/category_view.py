from ..models.category import Category
from ..serializers.category_serializer import (
    CategoryListSerializer,
    CategoryCreateSerializer,
)
from rest_framework.viewsets import ModelViewSet
from ..permissions import IsAdminOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny


class CategoryViewSet(ModelViewSet):
    serializer_class = CategoryListSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend]
    pagination_class = PageNumberPagination
    pagination_class.page_size = 10

    def get_queryset(self):
        return Category.objects.filter(is_active=True)

    def get_serializer_class(self):
        if self.action == "create":
            return CategoryCreateSerializer
        elif self.action == "list":
            return CategoryListSerializer
        return CategoryListSerializer

    def get_permissions(self):
        if self.action == "all_category":
            return [AllowAny()]
        return super().get_permissions()

    @action(detail=False, methods=["get"], url_path="all-categories")
    def all_category(self, request):
        category = self.get_queryset()
        serializer = CategoryListSerializer(category, many=True)
        return Response(serializer.data)
