from rest_framework import serializers
from .models import Usuario, Servidor, Formulario, Email, Token, MensajeEnviado


class EmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Email
        fields = ['id','email']

class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = ['id','email','token', 'is_validated']

       
class UsuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'uapaterno', 'uapmaterno', 'unombre','email', 'calle', 'numero', 'colonia', 'cp', 'localidad', 'municipio', 'estado']
       
class SerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servidor
        fields = ['id', 'sapaterno', 'sapmaterno', 'snombre', 'cargo']
    
class MensajeEnviadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MensajeEnviado
        fields = ['id', 'formulario', 'mensaje', 'archivo', 'fecha_envio']

class FormSerializer(serializers.ModelSerializer):
    usuario = UsuSerializer()
    servidor = SerSerializer()
    mensajes_enviados = MensajeEnviadoSerializer(many=True, read_only=True)

    class Meta:
        model = Formulario
        fields = ['id', 'usuario', 'servidor', 'descripcion', 'status', 'created_at', 'mensajes_enviados']

    def create(self, validated_data):
        usuario_data = validated_data.pop('usuario')
        servidor_data = validated_data.pop('servidor')
        
        usuario = Usuario.objects.create(**usuario_data)
        servidor = Servidor.objects.create(**servidor_data)
        
        formulario = Formulario.objects.create(usuario=usuario, servidor=servidor, **validated_data)
        return formulario

