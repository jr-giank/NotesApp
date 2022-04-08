from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from Notes.models import Note
from rest_framework import serializers

class Notes(serializers.ModelSerializer):

    class Meta:
        model = Note
        fields = '__all__'

class SignUp(serializers.ModelSerializer):

    def validate_password(self, password):
        return make_password(password)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'username', 'password']