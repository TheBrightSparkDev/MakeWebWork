# Generated by Django 4.1.6 on 2023-07-25 18:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('default_site', '0043_rename_address_line_three_userprofile_county_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userprofile',
            old_name='address_line_one',
            new_name='Address_line_one',
        ),
        migrations.RenameField(
            model_name='userprofile',
            old_name='birth_date',
            new_name='Birth_date',
        ),
        migrations.RenameField(
            model_name='userprofile',
            old_name='ContactViaEmail',
            new_name='Contact_via_email',
        ),
        migrations.RenameField(
            model_name='userprofile',
            old_name='ContactViaPhone',
            new_name='Contact_via_phone',
        ),
        migrations.RenameField(
            model_name='userprofile',
            old_name='postcode',
            new_name='Postcode',
        ),
        migrations.RenameField(
            model_name='userprofile',
            old_name='uk_resident',
            new_name='Uk_resident',
        ),
        migrations.AddField(
            model_name='userprofile',
            name='House_number_or_name',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
    ]