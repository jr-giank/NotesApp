from django.shortcuts import render
from Notes.models import Note
from .serializers import Notes
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.
@api_view(['GET'])
def api(request):

    api_urls = {
        'notes': 'notes/list',
        'create': 'notes/create',
        'update': 'notes/update',
        'delete': 'notes/delete',
        'token': 'token',
        'token refresh': 'token/refresh'
    }

    return Response(api_urls)

@api_view(['GET'])
def listNotes(request):

    notes = Note.objects.all()
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