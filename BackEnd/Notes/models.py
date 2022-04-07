from django.db import models

# Create your models here.
class Note(models.Model):
    title = models.CharField(max_length=25, blank=False, null=False)
    body = models.CharField(max_length=800, blank=True, null=True)

    def __str__(self):
        return self.title