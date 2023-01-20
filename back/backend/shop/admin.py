from django.contrib import admin
from django.contrib.admin import ModelAdmin

from .models import Goods


@admin.register(Goods)
class GoodAdmin(ModelAdmin):
    pass
