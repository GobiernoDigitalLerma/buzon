# Generated by Django 5.0.6 on 2024-07-22 03:24

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('formulario', '0020_emailentrada_remove_formulario_validacion_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='ValidationToken',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('token', models.CharField(max_length=255)),
            ],
        ),
        migrations.RemoveField(
            model_name='tokenentrada',
            name='email',
        ),
        migrations.RemoveField(
            model_name='formulario',
            name='token',
        ),
        migrations.AddField(
            model_name='formulario',
            name='validacion',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='formulario.validationtoken'),
        ),
        migrations.DeleteModel(
            name='EmailEntrada',
        ),
        migrations.DeleteModel(
            name='TokenEntrada',
        ),
    ]
