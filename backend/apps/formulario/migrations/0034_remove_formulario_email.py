# Generated by Django 5.0.6 on 2024-07-31 03:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('formulario', '0033_formulario_email'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='formulario',
            name='email',
        ),
    ]
