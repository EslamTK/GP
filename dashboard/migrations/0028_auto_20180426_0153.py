# Generated by Django 2.0.4 on 2018-04-25 23:53

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('dashboard', '0027_auto_20180426_0042'),
    ]

    operations = [
        migrations.AlterField(
            model_name='studentcourse',
            name='study_time',
            field=models.PositiveSmallIntegerField(
                choices=[(1, '2 hours'), (2, '2 to 5 hours'), (3, '5 to 10 hours'), (4, '10 hours')]),
        ),
    ]
