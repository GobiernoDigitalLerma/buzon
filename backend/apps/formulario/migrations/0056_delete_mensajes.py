# Generated by Django 5.0.6 on 2024-08-22 07:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('formulario', '0055_rename_mensajeenviado_mensajes'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Mensajes',
        ),
    ]
