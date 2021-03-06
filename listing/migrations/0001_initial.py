# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-30 04:52
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Comic',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('start', models.IntegerField()),
                ('end', models.IntegerField()),
                ('scraped', models.BooleanField()),
                ('refreshed_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ['title'],
            },
        ),
        migrations.CreateModel(
            name='Creator',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first', models.CharField(max_length=100)),
                ('last', models.CharField(blank=True, max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Issue',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('link', models.URLField()),
                ('num', models.FloatField(blank=True)),
                ('comic', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='listing.Comic')),
            ],
            options={
                'ordering': ['num'],
            },
        ),
        migrations.AddField(
            model_name='creator',
            name='issues',
            field=models.ManyToManyField(to='listing.Issue'),
        ),
    ]
