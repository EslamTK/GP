# Generated by Django 2.0.4 on 2018-04-24 21:36

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('dashboard', '0024_report_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='report',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now, editable=False),
        ),
    ]