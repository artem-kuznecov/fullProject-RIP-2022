# Generated by Django 4.1.1 on 2023-01-16 20:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0008_alter_orders_date_confirmed_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='goods',
            name='description',
            field=models.CharField(max_length=255, verbose_name='Описание товара'),
        ),
    ]