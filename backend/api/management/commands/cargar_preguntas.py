import json
from django.core.management.base import BaseCommand
from api.models import Pregunta, Respuesta

class Command(BaseCommand):
    help = 'Carga preguntas y respuestas desde preguntas.json'

    def handle(self, *args, **kwargs):
        # Limpia las colecciones antes de cargar para evitar conflictos de ObjectId/int
        Pregunta.objects.all().delete()
        Respuesta.objects.all().delete()
        with open('preguntas.json', encoding='utf-8') as f:
            data = json.load(f)
        for pregunta_data in data:
            pregunta = Pregunta.objects.create(texto=pregunta_data['texto'])
            for respuesta_data in pregunta_data['respuestas']:
                Respuesta.objects.create(
                    pregunta=pregunta,
                    texto=respuesta_data['texto'],
                    carrera=respuesta_data['carrera']
                )
        self.stdout.write(self.style.SUCCESS('Preguntas y respuestas cargadas correctamente.'))
