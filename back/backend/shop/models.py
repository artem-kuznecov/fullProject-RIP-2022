import datetime

from django.db import models
from django.contrib.auth.models import User

from user_profile.models import UserProfile


# СТАТУСЫ ЗАКАЗА:
# в обработке, отменен, подтвержден, в пути, готов к выдаче

# отменен <- в обработке -> подтвержден -> в пути -> готов к выдаче


class Goods(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, verbose_name="Название товара")
    price = models.IntegerField(verbose_name="Цена товара")
    image = models.CharField(max_length=100, verbose_name="Фото товара")
    description = models.CharField(max_length=255, verbose_name="Описание товара")
    # img = models.ImageField(null=True, blank=True, upload_to='images/', verbose_name='Фотка')
    ssilka = models.URLField(max_length=200, default='')

    def __str__(self):
        return self.name


class Reservations(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, verbose_name="Название товара")
    price = models.IntegerField(verbose_name="Цена товара")
    image = models.CharField(max_length=100, verbose_name="Фото товара")
    description = models.CharField(max_length=100, verbose_name="Описание товара")
    img = models.ImageField(null=True, blank=True, upload_to='images/', verbose_name='Фотка')
    status = models.CharField(max_length=12, default='В обработке')
    date_created = models.DateField(auto_now=True, verbose_name="Дата заказа")
    date_processed = models.DateField(auto_now_add=True, verbose_name="Дата последней обработки")
    orderer_id = models.IntegerField(null=True)

    def __str__(self):
        return self.id


class Orders(models.Model):
    id = models.AutoField(primary_key=True)
    item = models.ForeignKey(Goods, on_delete=models.DO_NOTHING, null=True)
    user = models.ForeignKey(UserProfile, on_delete=models.DO_NOTHING, null=True)
    status = models.CharField(max_length=15, default='В обработке')
    date_created = models.DateField(auto_now_add=True, verbose_name="Дата заказа")
    date_confirmed = models.DateField(auto_now=True, verbose_name="Дата подтверждения")


    def __str__(self):
        return self.id








