from django.db.models import Sum
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from ..permissions import IsAdmin
from ..models.order_detail import OrderDetail, Product
from ..serializers.report_serializer import TopSellingProductSerializer
from rest_framework.response import Response
from rest_framework import status


class Top5BestSellingProductsAPIView(APIView):
    permission_classes = [IsAdmin, IsAuthenticated]

    def get(self, request):
        details = (
            Product.objects.annotate(
                unidades_mas_vendidas=Sum("order_details__quantity")
            )
            .filter(unidades_mas_vendidas__isnull=False)
            .order_by("-unidades_mas_vendidas", "name")[:5]
        )
        serializer = TopSellingProductSerializer(
            details,
            many=True,
        )
        return Response(serializer.data, status=status.HTTP_200_OK)
