# Generated by Django 5.0.3 on 2024-05-26 17:45

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('learn', '0005_course'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='enrolled_users',
            field=models.ManyToManyField(db_index=True, related_name='enrolled_coursers', to=settings.AUTH_USER_MODEL),
        ),
    ]