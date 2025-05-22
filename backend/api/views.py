from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Pregunta, Respuesta, UsuarioRespuesta
from .serializers import PreguntaSerializer, UsuarioRespuestaSerializer

class PreguntaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Pregunta.objects.all()
    serializer_class = PreguntaSerializer

class UsuarioRespuestaViewSet(viewsets.ModelViewSet):
    queryset = UsuarioRespuesta.objects.all()
    serializer_class = UsuarioRespuestaSerializer

    def create(self, request, *args, **kwargs):
        # Aquí podrías agregar lógica para calcular la recomendación
        return super().create(request, *args, **kwargs)
