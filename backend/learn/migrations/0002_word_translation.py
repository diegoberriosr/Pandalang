# Generated by Django 5.0.3 on 2024-05-26 19:57

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('learn', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Word',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('word', models.TextField()),
                ('language', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='words', to='learn.language')),
                ('lesson', models.ManyToManyField(related_name='words', to='learn.lesson')),
                ('seen_by', models.ManyToManyField(db_index=True, related_name='seen_words', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Translation',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('origin', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='origin_translations', to='learn.word')),
                ('target', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='target_translations', to='learn.word')),
            ],
        ),
    ]
