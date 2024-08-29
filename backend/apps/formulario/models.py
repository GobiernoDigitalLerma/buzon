from django.db import models


class Email(models.Model):
    email = models.EmailField(unique=True)

class Token(models.Model):
    email = models.ForeignKey(Email, on_delete=models.CASCADE)
    token = models.CharField(max_length=255)
    is_validated = models.BooleanField(default=False)

class Usuario(models.Model):
    uapaterno = models.CharField(max_length=15)
    uapmaterno = models.CharField(max_length=15)
    unombre = models.CharField(max_length=30)
    email = models.EmailField( ) # colocar default ="defaul@example.com" al ejecutar python manage.py makemigrations y luego mpython manage.py migrate
    #despues borrar  dafult ="defaul@example.com"  y ejecutar python manage.py makemigrations y luego mpython manage.py migrate
    calle = models.CharField(max_length=50)
    numero = models.PositiveIntegerField()
    colonia = models.CharField(max_length=60)
    cp = models.PositiveIntegerField()
    localidad = models.CharField(max_length=20)
    municipio = models.CharField(max_length=20)
    estado = models.CharField(max_length=20)

class Servidor(models.Model):
    sapaterno = models.CharField(max_length=15)
    sapmaterno = models.CharField(max_length=15)
    snombre = models.CharField(max_length=15)
    cargo = models.CharField(max_length=80)

class Formulario(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE , default=0)
    servidor = models.ForeignKey(Servidor, on_delete=models.CASCADE, default=0)
    descripcion = models.TextField()
    status = models.CharField(max_length=20, default="sin responder")
    created_at = models.DateTimeField(auto_now_add=True)

class MensajeEnviado(models.Model):
    formulario = models.ForeignKey(Formulario, on_delete=models.CASCADE)
    mensaje = models.TextField()
    archivo = models.FileField(upload_to='archivos/', blank=True, null=True)
    fecha_envio = models.DateTimeField(auto_now_add=True)