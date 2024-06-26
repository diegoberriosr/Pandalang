# Generated by Django 5.0.3 on 2024-05-26 21:15

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('learn', '0003_session'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='active_users',
            field=models.ManyToManyField(db_index=True, related_name='active_course', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='user',
            name='current_streak',
            field=models.PositiveIntegerField(null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='largest_streak',
            field=models.PositiveIntegerField(null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='on_streak',
            field=models.BooleanField(default=False),
        ),
    ]
