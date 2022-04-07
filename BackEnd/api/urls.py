from django.urls import path
from . import views

urlpatterns = [
    path('', views.api),
    path('notes/list/', views.listNotes, name='lists'),
    path('notes/create/', views.createNote, name='create'),
    path('notes/update/<int:id>', views.updateNote, name='update'),
    path('notes/delete/<int:id>', views.deleteNote, name='delete'),
]