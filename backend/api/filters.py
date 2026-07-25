import django_filters
from .models import Product


class ProductFilter(django_filters.FilterSet):
    price_min = django_filters.NumberFilter(field_name="unit_price", lookup_expr="gte")
    price_max = django_filters.NumberFilter(field_name="unit_price", lookup_expr="lte")
    category = django_filters.CharFilter(field_name="category", lookup_expr="exact")

    class Meta:
        model = Product
        fields = ["unit_price", "category"]
