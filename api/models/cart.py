from django.db import models
from .user import User


class Cart(models.Model):
    class StatusTextChoice(models.TextChoices):
        ACTIVE = "ACTIVE", "Active"
        ABANDONED = "ABANDONED", "Abandoned"
        CONVERTED = "CONVERTED", "Converted"

    id = models.AutoField(primary_key=True, editable=False)
    status = models.CharField(
        max_length=12, choices=StatusTextChoice.choices, default=StatusTextChoice.ACTIVE
    )
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="carts", null=True, blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.id} {self.status}"

    class Meta:
        db_table = "cart"
        verbose_name = "Carrito"
        verbose_name_plural = "Carritos"
