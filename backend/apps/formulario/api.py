from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Formulario, Usuario, Servidor, Email, Token, MensajeEnviado
from .serializers import FormSerializer, UsuSerializer, SerSerializer, EmailSerializer, TokenSerializer, MensajeEnviadoSerializer
import uuid
from django.core.mail import EmailMessage
from rest_framework.decorators import action 
from django.core.mail import send_mail


class FormViewSet(viewsets.ModelViewSet):
    queryset = Formulario.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = FormSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        formulario = serializer.save()

        # espera de mensaje
        user_email = formulario.usuario.email
        subject = 'Tu solicitud está en espera'
        message = f"Estimado {formulario.usuario.unombre},\n\nTu solicitud ha sido recibida y está en espera, tu número de FOLIO es: {formulario.id}. Pronto nos pondremos en contacto contigo para más detalles."
        email_from = 'noreply@tu-dominio.com'  
        recipient_list = [user_email]

        try:
            send_mail(subject, message, email_from, recipient_list)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(f"Error al enviar correo: {e}")
            return Response({'detail': 'Error al enviar correo, pero el formulario fue enviado correctamente.'}, status=status.HTTP_201_CREATED)
        

    @action(detail=True, methods=['post'])
    def enviar_mensaje_personalizado(self, request, pk=None):
       
        try:
            formulario = self.get_object()
        except Formulario.DoesNotExist:
            return Response({'detail': 'Formulario no encontrado.'}, status=status.HTTP_404_NOT_FOUND)

        # mensaje personalizado 
        mensaje_personalizado = request.data.get('mensaje', None)
        archivo = request.FILES.get('archivo', None)
        
        if not mensaje_personalizado:
            return Response({'detail': 'El campo "mensaje" es obligatorio.'}, status=status.HTTP_400_BAD_REQUEST)

        user_email = formulario.usuario.email
        subject = 'Ayuntamiento de Lerma.'
        email_from = 'noreply@tu-dominio.com'
        recipient_list = [user_email]
        email_message = EmailMessage(subject, mensaje_personalizado, email_from, recipient_list)

        if archivo:
            email_message.attach(archivo.name, archivo.read(), archivo.content_type)

        try:
            email_message.send()
            
            formulario.status = "respondido"
            formulario.save()

            mensaje_enviado = MensajeEnviado.objects.create(
                formulario=formulario,
                mensaje=mensaje_personalizado,
                archivo=archivo,
            )

            return Response({'detail': 'Correo enviado correctamente.', 'mensaje_enviado': MensajeEnviadoSerializer(mensaje_enviado).data}, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Error al enviar correo: {e}")
            return Response({'detail': 'Error al enviar el correo.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            
   
    
    
class UsuViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    permission_classes = [permissions.AllowAny] 
    serializer_class = UsuSerializer

class SerViewSet(viewsets.ModelViewSet):
    queryset = Servidor.objects.all()
    permission_classes = [permissions.AllowAny]  
    serializer_class = SerSerializer

class EmailViewSet(viewsets.ModelViewSet):
    queryset = Email.objects.all()
    serializer_class = EmailSerializer
    #envio de token
    def create(self, request, *args, **kwargs):
        email_direccion = request.data.get('email')
        
        if not email_direccion:
            return Response({'message': 'El campo email es obligatorio'}, status=status.HTTP_400_BAD_REQUEST)
        
        email, created = Email.objects.get_or_create(email=email_direccion)
        
        if not created:
            if Token.objects.filter(email=email, is_validated=True).exists():
                return Response({'message': 'El correo electrónico ya está validado', 'isValidated': True}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'El correo electrónico ya existe, pero no está validado'}, status=status.HTTP_400_BAD_REQUEST)
        
        token = Token.objects.create(email=email, token=uuid.uuid4().hex[:10])
        email_message = EmailMessage(
            "Mensaje de Ayuntamiento Lerma",
            f"Tu token único es: {token.token}",
            '',
            [email.email]
        )
        
        try:
            email_message.send()
            return Response({'message': 'Correo electrónico enviado correctamente', 'isValidated': False}, status=status.HTTP_201_CREATED)
        except Exception as e:

            print(f'Error al enviar correo electrónico: {e}')
            return Response({'message': 'Error al enviar correo electrónico'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

        

        

class TokenViewSet(viewsets.ModelViewSet):
    queryset = Token.objects.all()
    serializer_class = TokenSerializer

    def create(self, request, *args, **kwargs):
        email_address = request.data.get('email')
        if not email_address:
            return Response({'message': 'El campo email es obligatorio'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            email = Email.objects.get(email=email_address)
        except Email.DoesNotExist:
            return Response({'message': 'El correo electronico no existe'}, status=status.HTTP_400_BAD_REQUEST)
        
        token = Token.objects.create(email=email, token=uuid.uuid4().hex[:10])
        return Response(self.serializer_class(token).data, status=status.HTTP_201_CREATED)

    @action(methods=['post'], detail=False)
    def validacion(self, request, *args, **kwargs):
        token = request.data.get('token')
        if not token:
            return Response({'message': 'El campo token es obligatorio'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            token_obj = Token.objects.get(token=token)
            if token_obj:
                token_obj.is_validated = True
                token_obj.save()
                return Response({'message': 'Token valido', 'email': token_obj.email.email}, status=status.HTTP_200_OK)
        except Token.DoesNotExist:
            return Response({'message': 'Token invalido'}, status=status.HTTP_400_BAD_REQUEST)
        

    

class MensajeEnviadoViewSet(viewsets.ModelViewSet):
    queryset = MensajeEnviado.objects.all()
    serializer_class = MensajeEnviadoSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        formulario_id = self.request.query_params.get('formulario')
        if formulario_id:
            queryset = queryset.filter(formulario_id=formulario_id)
        return queryset