# Generated by Django 4.1.1 on 2023-01-16 13:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0002_rename_item_id_orders_item_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='reservations',
            name='img',
            field=models.ImageField(blank=True, null=True, upload_to='images/', verbose_name='Фотка'),
        ),
    ]
