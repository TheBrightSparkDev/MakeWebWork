# Generated by Django 4.1.6 on 2025-05-16 23:20

import default_site.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('default_site', '0051_clientsandgroups_colormodifier'),
    ]

    operations = [
        migrations.AddField(
            model_name='clientgallerypage',
            name='imageTwoURL',
            field=models.ImageField(blank=True, max_length=150, upload_to=default_site.models.upload_to_image_link_graphic),
        ),
    ]
