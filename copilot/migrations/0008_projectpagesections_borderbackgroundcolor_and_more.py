# Generated by Django 4.1.6 on 2025-06-03 22:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('copilot', '0007_projectpagesections_projectpage'),
    ]

    operations = [
        migrations.AddField(
            model_name='projectpagesections',
            name='borderBackgroundColor',
            field=models.CharField(default='black', max_length=100),
        ),
        migrations.AddField(
            model_name='projectpagesections',
            name='borderBackgroundColorModifier',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
