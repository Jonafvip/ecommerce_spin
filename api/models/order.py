from django.db import models
from .user import User


class Order(models.Model):
    class StatusTextChoice(models.TextChoices):
        PENDING = "PENDING", "Pending"
        CANCELED = "CANCELED", "Canceled"
        CONFIRMED = "CONFIRMED", "Confirmed"
        DELIVERED = "DELIVERED", "Delivered"
        SHIPPED = "SHIPPED", "Shipped"

    id = models.AutoField(primary_key=True, editable=False)
    status = models.CharField(max_length=12, choices=StatusTextChoice.choices, default=StatusTextChoice.PENDING)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.id} {self.status}"

    class Meta:
        db_table = "order"
        verbose_name = "Pedido"
        verbose_name_plural = "Pedidos"
