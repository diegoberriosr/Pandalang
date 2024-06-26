# Generated by Django 5.0.3 on 2024-05-28 20:08

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('learn', '0004_course_active_users_user_current_streak_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='course',
            name='active_users',
        ),
        migrations.AddField(
            model_name='lesson',
            name='completed_by',
            field=models.ManyToManyField(related_name='completed_lessons', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='user',
            name='active_course',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='active_users', to='learn.course'),
        ),
        migrations.AlterField(
            model_name='course',
            name='enrolled_users',
            field=models.ManyToManyField(db_index=True, related_name='enrolled_courses', to=settings.AUTH_USER_MODEL),
        ),
    ]
