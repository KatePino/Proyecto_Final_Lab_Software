from django.db import models
from django.core.exceptions import ValidationError

class Pregunta(models.Model):
    texto = models.CharField(max_length=255)

    def __str__(self):
        return self.texto

class Respuesta(models.Model):
    pregunta = models.ForeignKey(Pregunta, related_name='respuestas', on_delete=models.CASCADE)
    texto = models.CharField(max_length=255)
    carrera = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.texto} ({self.carrera})"

    def clean(self):
        # Forzar que la ForeignKey sea un int, no un ObjectId
        if not isinstance(self.pregunta_id, int):
            raise ValidationError('El id de la pregunta debe ser un número entero.')

class UsuarioRespuesta(models.Model):
    nombre = models.CharField(max_length=100)
    email = models.EmailField()
    edad = models.IntegerField()
    respuestas = models.JSONField()
    recomendacion = models.CharField(max_length=100)
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nombre} - {self.recomendacion}"
