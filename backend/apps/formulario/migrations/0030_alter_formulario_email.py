# Generated by Django 5.0.6 on 2024-07-31 03:15

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('formulario', '0029_formulario_email'),
    ]

    operations = [
        migrations.AlterField(
            model_name='formulario',
            name='email',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='formulario.email'),
        ),
    ]
