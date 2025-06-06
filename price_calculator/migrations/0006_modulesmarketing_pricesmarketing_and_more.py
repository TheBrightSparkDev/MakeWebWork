# Generated by Django 4.1.6 on 2025-05-05 18:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('default_site', '0046_importantoptionsmarketing'),
        ('price_calculator', '0005_savedquotes_dateofquote_savedquotes_nameofquote'),
    ]

    operations = [
        migrations.CreateModel(
            name='ModulesMarketing',
            fields=[
                ('moduleID', models.BigAutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('description', models.CharField(max_length=1000)),
                ('cost', models.CharField(max_length=50)),
                ('devtimedays', models.IntegerField(default=True)),
                ('available', models.BooleanField(default=False)),
                ('comingsoon', models.BooleanField(default=False)),
                ('releasedate', models.DateField(blank=True, null=True)),
                ('readmorelink', models.CharField(blank=True, max_length=200, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='PricesMarketing',
            fields=[
                ('pricesID', models.BigAutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('description', models.CharField(blank=True, max_length=1000, null=True)),
                ('price', models.IntegerField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='SavedQuotesMarketing',
            fields=[
                ('QuoteID', models.BigAutoField(primary_key=True, serialize=False)),
                ('SelectedModules', models.CharField(blank=True, max_length=50, null=True)),
                ('JourneyPage', models.CharField(max_length=50)),
                ('AmountOfPages', models.IntegerField(blank=True, null=True)),
                ('AmountOfProducts', models.IntegerField(blank=True, null=True)),
                ('AmountOfSubscribers', models.IntegerField(blank=True, null=True)),
                ('AmountOfTraffic', models.IntegerField(blank=True, null=True)),
                ('AmountOfData', models.IntegerField(blank=True, null=True)),
                ('CostOfPages', models.IntegerField(blank=True, null=True)),
                ('CostOfProducts', models.IntegerField(blank=True, null=True)),
                ('CostOfSubscribers', models.IntegerField(blank=True, null=True)),
                ('CostOfTraffic', models.IntegerField(blank=True, null=True)),
                ('CostOfData', models.IntegerField(blank=True, null=True)),
                ('Deposit', models.IntegerField(blank=True, null=True)),
                ('Total', models.IntegerField(blank=True, null=True)),
                ('DateOfQuote', models.DateField()),
                ('NameOfQuote', models.CharField(max_length=50)),
                ('CustomerID', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='default_site.userprofile')),
            ],
        ),
    ]
