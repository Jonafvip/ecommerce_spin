from pathlib import Path

from django.core.management.base import BaseCommand
from api.models.category import Category
from api.models.product import Product
import json


class Command(BaseCommand):
    help = "Cargar datos semilla para Productos y categoria"

    def handle(self, *args, **options):
        Product.objects.all().delete()
        Category.objects.all().delete()
        with open("api/fixtures/categories.json") as f:
            categories = json.load(f)

        for cat in categories:
            Category.objects.create(pk=cat["pk"], **cat["fields"])
            self.stdout.write(f" Categoria {cat["fields"]["name"]} creada ✅")

        with open("api/fixtures/products.json") as f:
            products = json.load(f)

        for prod in products:
            category_id = prod["fields"].pop("category")
            product_data = prod["fields"]
            product_data["category"] = Category.objects.get(id=category_id)
            Product.objects.create(pk=prod["pk"], **product_data)
            self.stdout.write(f" Producto {prod["fields"]["name"]} creado ✅")
        self.stdout.write(self.style.SUCCESS("Datos cargados exitosamente"))
