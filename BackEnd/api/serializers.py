from dataclasses import fields
from pyexpat import model
from Notes.models import Note
from rest_framework import serializers

class Notes(serializers.ModelSerializer):

    class Meta:
        model = Note
        fields = '__all__'