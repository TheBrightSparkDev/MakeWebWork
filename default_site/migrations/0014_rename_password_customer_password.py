# Generated by Django 4.1.6 on 2023-02-18 01:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('default_site', '0013_rename_password_customer_password_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='customer',
            old_name='Password',
            new_name='password',
        ),
    ]
