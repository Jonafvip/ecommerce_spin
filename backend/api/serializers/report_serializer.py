from django.db.models import Sum
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from ..models.product import Product


class TopSellingProductSerializer(serializers.ModelSerializer):
    unidades_mas_vendidas = serializers.IntegerField(read_only=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "image",
            "unit_price",
            "unidades_mas_vendidas",
        ]
