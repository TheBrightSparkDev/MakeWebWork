# Generated by Django 4.1.6 on 2023-02-20 00:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('default_site', '0031_rename_required_formquestions_equired_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='formquestions',
            old_name='equired',
            new_name='required',
        ),
    ]