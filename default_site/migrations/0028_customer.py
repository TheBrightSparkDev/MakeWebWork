# Generated by Django 4.1.6 on 2023-02-19 01:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('default_site', '0027_delete_customer'),
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('CustomerID', models.BigAutoField(primary_key=True, serialize=False)),
                ('Firstname', models.CharField(max_length=40)),
                ('Lastname', models.CharField(max_length=40)),
                ('EmailAddress', models.CharField(max_length=100)),
                ('PhoneNumber', models.CharField(max_length=15)),
                ('password', models.CharField(max_length=30)),
            ],
        ),
    ]
