from django.db import models
from .product import Product
from .cart import Cart
from django.core.validators import MinValueValidator


class CartDetail(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    quantity = models.PositiveSmallIntegerField(validators=[MinValueValidator(1)])
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="cart_items")
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="details")

    @property
    def total(self):
        return self.quantity * self.price

    @property
    def price(self):
        return self.product.unit_price

    def __str__(self):
        return f"{self.product.name} {self.price} {self.quantity}"

    class Meta:
        db_table = "cart_details"
        verbose_name = "Carrito Detalle"
        verbose_name_plural = "Carrito Detalles"
