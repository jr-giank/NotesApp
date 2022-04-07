from django.shortcuts import render
from django.contrib.auth.models import User

# Create your views here.
def registerUser(request):

    return render(request, 'users/register.html')

def loginUser(request):

    return render(request, 'users/login.html')