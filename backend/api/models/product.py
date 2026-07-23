from django.db import models
from .category import Category
from django.core.validators import MinValueValidator


class Product(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=155)
    description = models.TextField(blank=True, null=True)
    stock = models.PositiveSmallIntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0.01)])
    product_code = models.CharField(max_length=10, unique=True)
    image = models.ImageField(upload_to="products/", blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name="products")

    def __str__(self):
        return f"{self.name} {self.stock} {self.unit_price}"

    class Meta:
        db_table = "product"
        ordering = ["-created_at"]
        verbose_name = "Producto"
        verbose_name_plural = "Productos"
        constraints = [
            models.UniqueConstraint(
                fields=["name", "category"],
                name="nombre_unico_por_categoria"
            )]
