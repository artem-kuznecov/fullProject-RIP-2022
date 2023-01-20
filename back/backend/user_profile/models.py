from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255, default='', null=True)
    last_name = models.CharField(max_length=255, default='', null=True)
    phone = models.CharField(max_length=20, default='', null=True)
    email = models.CharField(max_length=30, default='', null=True)

    def __str__(self):
        return self.first_name



