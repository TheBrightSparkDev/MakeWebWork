# Generated by Django 4.1.6 on 2023-02-20 00:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('default_site', '0030_formquestions_placeholdertext_formquestions_required'),
    ]

    operations = [
        migrations.RenameField(
            model_name='formquestions',
            old_name='Required',
            new_name='equired',
        ),
        migrations.RenameField(
            model_name='formquestions',
            old_name='Placeholdertext',
            new_name='placeholdertext',
        ),
        migrations.AlterField(
            model_name='formquestions',
            name='type',
            field=models.CharField(blank=True, choices=[('button', 'button'), ('checkbox', 'checkbox'), ('color', 'color'), ('date', 'date'), ('datetime-local', 'datetime-local'), ('email', 'email'), ('file', 'file'), ('hidden', 'hidden'), ('image', 'image'), ('month', 'month'), ('number', 'number'), ('password', 'password'), ('radio', 'radio'), ('range', 'range'), ('reset', 'reset'), ('search', 'search'), ('tel', 'tel'), ('text', 'text'), ('time', 'time'), ('url', 'url'), ('week', 'week'), ('select', 'select')], max_length=50, null=True),
        ),
    ]