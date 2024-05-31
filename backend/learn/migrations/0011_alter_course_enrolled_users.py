# Generated by Django 5.0.3 on 2024-05-30 18:23

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('learn', '0010_alter_course_enrolled_users'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='enrolled_users',
            field=models.ManyToManyField(blank=True, db_index=True, null=True, related_name='enrolled_courses', to=settings.AUTH_USER_MODEL),
        ),
    ]
