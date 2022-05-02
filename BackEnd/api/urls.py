from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', views.api),
    path('notes/list/', views.listNotes, name='lists'),
    path('notes/create/', views.createNote, name='create'),
    path('notes/update/<int:id>', views.updateNote, name='update'),
    path('notes/delete/<int:id>', views.deleteNote, name='delete'),
    path('sign/up/', views.signUp, name='sign-up'),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]