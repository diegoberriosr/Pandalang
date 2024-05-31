# Generated by Django 5.0.3 on 2024-05-30 18:22

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('learn', '0009_lesson_granted_xp_session_earned_xp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='enrolled_users',
            field=models.ManyToManyField(db_index=True, null=True, related_name='enrolled_courses', to=settings.AUTH_USER_MODEL),
        ),
    ]
