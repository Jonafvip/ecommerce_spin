from django.contrib import admin
from .models import Cart, Category, Product, User,CartDetail

# Register your models here.

admin.site.register([User, Product, Cart,CartDetail, Category])
