# Generated by Django 5.0.3 on 2024-06-02 18:40

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('learn', '0015_word_slug_word_sound'),
    ]

    operations = [
        migrations.AlterField(
            model_name='translation',
            name='seen_by',
            field=models.ManyToManyField(blank=True, db_index=True, null=True, related_name='seen_translations', to=settings.AUTH_USER_MODEL),
        ),
    ]