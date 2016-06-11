# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-11 09:52
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('listing', '0003_auto_20160601_1424'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('extras', '0003_auto_20160605_2127'),
    ]

    operations = [
        migrations.CreateModel(
            name='Playlist',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.CharField(max_length=500)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='playlists', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('created_at',),
            },
        ),
        migrations.CreateModel(
            name='PlaylistItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.PositiveIntegerField(db_index=True, editable=False)),
                ('issue', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='listing.Issue')),
                ('playlist', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='extras.Playlist')),
            ],
            options={
                'ordering': ('playlist', 'order'),
            },
        ),
        migrations.AddField(
            model_name='playlist',
            name='items',
            field=models.ManyToManyField(through='extras.PlaylistItem', to='listing.Issue'),
        ),
    ]
