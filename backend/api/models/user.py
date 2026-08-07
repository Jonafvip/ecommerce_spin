from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    class RoleTextChoice(models.TextChoices):
        ADMIN = "ADMIN", "Admin"
        CUSTOMER = "CUSTOMER", "Customer"

    id = models.AutoField(primary_key=True, editable=False)
    role = models.CharField(max_length=10, choices=RoleTextChoice.choices, default=RoleTextChoice.CUSTOMER)

    def __str__(self):
        return f"{self.username}"

    class Meta:
        db_table = "user"
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"
