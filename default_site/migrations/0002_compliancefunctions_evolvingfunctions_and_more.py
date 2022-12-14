# Generated by Django 4.1 on 2022-09-19 00:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('default_site', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ComplianceFunctions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('basic', models.CharField(max_length=500)),
                ('extended', models.CharField(max_length=500)),
                ('id_for_html', models.CharField(max_length=50)),
                ('display', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='EvolvingFunctions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('basic', models.CharField(max_length=500)),
                ('extended', models.CharField(max_length=500)),
                ('id_for_html', models.CharField(max_length=50)),
                ('display', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='SecurityFunctions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('basic', models.CharField(max_length=500)),
                ('extended', models.CharField(max_length=500)),
                ('id_for_html', models.CharField(max_length=50)),
                ('display', models.BooleanField(default=True)),
            ],
        ),
    ]
