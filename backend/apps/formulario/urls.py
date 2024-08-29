from django.urls import path, include
from rest_framework import routers
from django.contrib import admin
from .api import FormViewSet, SerViewSet, UsuViewSet, EmailViewSet, TokenViewSet, MensajeEnviadoViewSet
from django.conf.urls.static import static
from django.conf import settings
# Crear el enrutador y registrar los ViewSets
router = routers.DefaultRouter()
router.register(r'api/formulario', FormViewSet, basename='formulario')
router.register(r'api/servidor', SerViewSet, basename='servidor')
router.register(r'api/usuario', UsuViewSet, basename='usuario')
router.register(r'api/email', EmailViewSet, basename='email')
router.register(r'api/token', TokenViewSet, basename='token')
router.register(r'api/mensajes-enviados', MensajeEnviadoViewSet, basename='mensaje-enviado')


# Definir las URLs
urlpatterns = [
    path('', include(router.urls)),  # Incluir las URLs generadas por el enrutador
    path('admin/', admin.site.urls),
    path('validacion/', TokenViewSet.as_view({'get': 'list'}), name='validacion'),  # Ejemplo de ruta personalizada
    

    
    
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
