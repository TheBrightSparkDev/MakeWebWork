# Generated by Django 4.1.6 on 2023-02-18 01:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('default_site', '0014_rename_password_customer_password'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='formquestions',
            name='contactoption',
        ),
        migrations.DeleteModel(
            name='ContactOptions',
        ),
    ]
