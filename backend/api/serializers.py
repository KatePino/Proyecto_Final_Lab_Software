from rest_framework import serializers
from .models import Pregunta, Respuesta, UsuarioRespuesta

class RespuestaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Respuesta
        fields = ['id', 'texto', 'carrera']

class PreguntaSerializer(serializers.ModelSerializer):
    respuestas = RespuestaSerializer(many=True, read_only=True)
    class Meta:
        model = Pregunta
        fields = ['id', 'texto', 'respuestas']

class UsuarioRespuestaSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsuarioRespuesta
        fields = ['id', 'nombre', 'email', 'edad', 'respuestas', 'recomendacion', 'fecha']
