# Generated by Django 4.1.6 on 2023-04-05 20:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('default_site', '0041_qanda_order'),
    ]

    operations = [
        migrations.AddField(
            model_name='requesttickets',
            name='status',
            field=models.CharField(blank=True, choices=[('new', 'new'), ('in-progress', 'in-progress'), ('archived', 'archived'), ('priority_1', 'priority_1'), ('priority_2', 'priority_2'), ('priority_3', 'priority_3')], max_length=50, null=True),
        ),
    ]
