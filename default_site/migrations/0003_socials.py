# Generated by Django 4.1 on 2022-09-23 22:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('default_site', '0002_compliancefunctions_evolvingfunctions_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='socials',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('brand', models.CharField(max_length=30)),
                ('fontawesome', models.CharField(max_length=50)),
                ('link', models.CharField(blank='true', max_length=150, null='true')),
                ('display', models.BooleanField(default=True)),
            ],
        ),
    ]
