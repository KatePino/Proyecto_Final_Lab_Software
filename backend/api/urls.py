from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PreguntaViewSet, UsuarioRespuestaViewSet

router = DefaultRouter()
router.register(r'preguntas', PreguntaViewSet, basename='pregunta')
router.register(r'usuarios', UsuarioRespuestaViewSet, basename='usuariorespuesta')

urlpatterns = [
    path('', include(router.urls)),
]
