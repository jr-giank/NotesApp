from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=25, blank=False, null=False)
    body = models.CharField(max_length=800, blank=True, null=True)

    def __str__(self):
        return self.title