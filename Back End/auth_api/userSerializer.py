from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'last_login', 'date_joined', 'is_active')
        extra_kwargs = {'password': {'write_only': True}}
