# Generated by Django 4.1.6 on 2023-03-03 00:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('default_site', '0034_remove_selectoptions_contactoption_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='selectoptions',
            old_name='optionName',
            new_name='optionname',
        ),
        migrations.AlterField(
            model_name='formquestions',
            name='type',
            field=models.CharField(blank=True, choices=[('button', 'button'), ('checkbox', 'checkbox'), ('color', 'color'), ('date', 'date'), ('datetime-local', 'datetime-local'), ('email', 'email'), ('file', 'file'), ('hidden', 'hidden'), ('image', 'image'), ('month', 'month'), ('number', 'number'), ('password', 'password'), ('radio', 'radio'), ('range', 'range'), ('reset', 'reset'), ('search', 'search'), ('tel', 'tel'), ('text', 'text'), ('time', 'time'), ('url', 'url'), ('week', 'week'), ('select', 'select'), ('textarea', 'textarea')], max_length=50, null=True),
        ),
    ]