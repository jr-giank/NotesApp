from django.contrib.auth.models import User
from django.http.response import JsonResponse
from django.views import View
from Notes.models import Note
from .serializers import Notes, SignUp
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
import json

# Create your views here.
@api_view(['GET'])
def api(request):

    api_urls = {
        'notes': 'notes/list',
        'create': 'notes/create',
        'update': 'notes/update',
        'delete': 'notes/delete',
        'register-user': 'sign/up',
        'token': 'token',
        'token refresh': 'token/refresh'
    }

    return Response(api_urls)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listNotes(request):

    user = request.user
    notes = user.note_set.all()
    serializer = Notes(notes, many=True)

    return Response(serializer.data)

@api_view(['POST'])
def createNote(request):
    
    serializer = Notes(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['GET','POST'])
def updateNote(request, id):

    note = Note.objects.get(id=id)
    serializer = Notes(instance=note, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['DELETE'])
def deleteNote(request, id):

    note = Note.objects.get(id=id)
    note.delete()

    return Response('Nota Eliminada')

@api_view(['POST'])
def signUp(request):

    serializer = SignUp(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['GET'])
def listUsers(request):

    users = User.objects.all()
    serializer = SignUp(users, many=True)

    return Response(serializer.data)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer