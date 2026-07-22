from django.db import models
from .product import Product
from .order import Order
from django.core.validators import MinValueValidator


class OrderDetail(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveSmallIntegerField(validators=[MinValueValidator(1)])
    product = models.ForeignKey(Product, on_delete=models.PROTECT, related_name="order_details")
    order = models.ForeignKey(Order, on_delete=models.PROTECT, related_name="details")

    @property
    def total(self):
        return self.price * self.quantity

    def __str__(self):
        return f"{self.product.name} {self.price} {self.quantity}"

    class Meta:
        db_table = "order_details"
        verbose_name = "Pedido Detalle"
        verbose_name_plural = "Pedidos detalles"
