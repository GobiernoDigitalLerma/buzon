# Generated by Django 5.0.6 on 2024-08-03 05:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('formulario', '0044_alter_formulario_email'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='formulario',
            name='email',
        ),
        migrations.AddField(
            model_name='usuario',
            name='email',
            field=models.EmailField(default='defaul@gmail.com', max_length=254),
        ),
    ]
