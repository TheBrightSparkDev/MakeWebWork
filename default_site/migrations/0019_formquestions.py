# Generated by Django 4.1.6 on 2023-02-18 23:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('default_site', '0018_delete_formquestions'),
    ]

    operations = [
        migrations.CreateModel(
            name='FormQuestions',
            fields=[
                ('ID', models.BigAutoField(primary_key=True, serialize=False)),
                ('order', models.IntegerField()),
                ('question', models.CharField(max_length=200)),
                ('blockclass', models.CharField(blank=True, max_length=50, null=True)),
                ('labelclass', models.CharField(blank=True, max_length=50, null=True)),
                ('inputclass', models.CharField(blank=True, max_length=50, null=True)),
                ('selectoptions', models.CharField(max_length=500)),
                ('multiselection', models.BooleanField(default=False)),
                ('charlimit', models.IntegerField(blank=True, default=500, null=True)),
                ('contactoption', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='default_site.contactoptions')),
            ],
        ),
    ]
