# Generated by Django 4.1.6 on 2023-07-15 20:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('default_site', '0042_requesttickets_status'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userprofile',
            old_name='address_line_three',
            new_name='County',
        ),
        migrations.RenameField(
            model_name='userprofile',
            old_name='address_line_two',
            new_name='Town',
        ),
        migrations.AddField(
            model_name='userprofile',
            name='ContactViaEmail',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='ContactViaPhone',
            field=models.BooleanField(default=False),
        ),
    ]
