# Generated by Django 5.0.3 on 2024-05-28 20:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('learn', '0006_remove_word_lesson_translation_lesson'),
    ]

    operations = [
        migrations.AlterField(
            model_name='translation',
            name='lesson',
            field=models.ManyToManyField(related_name='translations', to='learn.lesson'),
        ),
    ]
