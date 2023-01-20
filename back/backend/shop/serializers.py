from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Goods, Orders, Reservations

from user_profile.serializers import UserProfileSerializer
from user_profile.models import UserProfile


class ReservationsSerializer(serializers.Serializer):
    status = serializers.CharField()

    def create(self, validated_data):
        return Goods.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        return instance


class ReservationsSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservations
        fields = ['id', 'name', 'price', 'image', 'description', 'date_created', 'date_processed', 'status', 'orderer_id']


class GoodsSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goods
        fields = ['id', 'name', 'price', 'description', 'ssilka']


class GoodsSerializer(serializers.Serializer):
    # pk = serializers.IntegerField()
    name = serializers.CharField(max_length=50)
    price = serializers.IntegerField()
    # image = serializers.CharField()
    description = serializers.CharField()
    ssilka = serializers.CharField()

    def create(self, validated_data):
        return Goods.objects.create(**validated_data)

    def update(self, instance, validated_data):
        # instance.id = validated_data.get('id', instance.name)
        instance.name = validated_data.get('name', instance.name)
        instance.price = validated_data.get('price', instance.price)
        # instance.image = validated_data.get('image', instance.image)
        instance.description = validated_data.get('description', instance.description)
        instance.ssilka = validated_data.get('ssilka', instance.ssilka)
        instance.save()
        return instance


class OrdersSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orders
        fields = ['id', 'item_id', 'user_id', 'status','date_created', 'date_confirmed']


class OrdersSerializer(serializers.Serializer):
    # pk = serializers.IntegerField()
    # item_id = serializers.IntegerField()
    # user_id = serializers.IntegerField()
    status = serializers.CharField()
    # username = serializers.CharField()

    def create(self, validated_data):
        item_id = serializers.IntegerField()
        user_id = serializers.IntegerField()
        return Orders.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.status = validated_data.get('status', instance.status)
        # instance.id = validated_data.get('id', instance.name)
        # instance.name = validated_data.get('name', instance.name)
        # instance.price = validated_data.get('price', instance.price)
        # instance.image = validated_data.get('image', instance.image)
        # instance.description = validated_data.get('description', instance.description)
        instance.save()
        return instance


