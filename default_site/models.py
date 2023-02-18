'''
These are the models used in the default site app these models
are all gathered by mostly static system tables. The reason for
using static tables is to avoid hard coding information into the
site that is subject to change. Allowing me to change the data in
the table once and having it replicated throughout the site.
'''

from django.db import models

# Create your models here.
# following classes are exclusive to this website
# for my own sanity
# pylint: disable=locally-disabled, multiple-statements, fixme, invalid-str-returned # noqa


class AdminFunctions(models.Model):
    '''
    This class is used to define the table that is used to
    populate the homepage complete admin functionality horizontal
    scroll section
    '''

    name = models.CharField(max_length=50, null=False, blank=False)
    basic = models.CharField(max_length=500, null=False, blank=False)
    extended = models.CharField(max_length=500, null=False, blank=False)
    id_for_html = models.CharField(max_length=50, null=False, blank=False)
    display = models.BooleanField(null=False, blank=False, default=True)

    def __str__(self):
        return self.name


class SecurityFunctions(models.Model):
    '''
    This class is used to define the table that is used to
    populate the homepage a secure website horizontal
    scroll section
    '''

    name = models.CharField(max_length=50, null=False, blank=False)
    basic = models.CharField(max_length=500, null=False, blank=False)
    extended = models.CharField(max_length=500, null=False, blank=False)
    id_for_html = models.CharField(max_length=50, null=False, blank=False)
    display = models.BooleanField(null=False, blank=False, default=True)

    def __str__(self):
        return self.name


class ComplianceFunctions(models.Model):
    '''
    This class is used to define the table that is used to
    populate the homepage a compliant website horizontal
    scroll section
    '''

    name = models.CharField(max_length=50, null=False, blank=False)
    basic = models.CharField(max_length=500, null=False, blank=False)
    extended = models.CharField(max_length=500, null=False, blank=False)
    id_for_html = models.CharField(max_length=50, null=False, blank=False)
    display = models.BooleanField(null=False, blank=False, default=True)

    def __str__(self):
        return self.name


class EvolvingFunctions(models.Model):
    '''
    This class is used to define the table that is used to
    populate the homepage an evolving website horizontal
    scroll section
    '''

    name = models.CharField(max_length=50, null=False, blank=False)
    basic = models.CharField(max_length=500, null=False, blank=False)
    extended = models.CharField(max_length=500, null=False, blank=False)
    id_for_html = models.CharField(max_length=50, null=False, blank=False)
    display = models.BooleanField(null=False, blank=False, default=True)

    def __str__(self):
        return self.name


class ImportantOptions(models.Model):
    '''
    This class is used to define the various options customers
    might deem important to them allowing me to show them a
    personalised answer to them
    '''

    name = models.CharField(max_length=30, null=False, blank=False)
    icon = models.CharField(max_length=100, null=False, blank=False)
    description = models.CharField(max_length=250, null=False, blank=False)
    longdescription = models.CharField(max_length=5000, null=False, blank=False) # noqa
    display = models.BooleanField(null=False, blank=False, default=True)

    def __str__(self):
        return self.name


class Customer(models.Model):
    '''
    This class is used to define the customer table
    '''
    CustomerID = models.BigAutoField(primary_key=True)
    Firstname = models.CharField(max_length=40, null=False, blank=False)
    Lastname = models.CharField(max_length=40, null=False, blank=False)
    EmailAddress = models.CharField(max_length=100, null=False, blank=False)
    PhoneNumber = models.CharField(max_length=15, null=False, blank=False)
    password = models.CharField(max_length=30, null=False, blank=False)


class ContactOptions(models.Model):
    '''
    This class is used to define the various ways you can get in contact
    '''
    htmlId = models.CharField(max_length=30, null=False, blank=False)
    name = models.CharField(max_length=30, null=False, blank=False)
    description = models.CharField(max_length=500, null=False, blank=False)

    def __str__(self):
        return self.name


class FormQuestions(models.Model):
    '''
    This class defines the question model there will be a many to one
    relationship to contactOptions where a contactOptionID will link
    to multiple FormQuestions
    '''
    ID = models.BigAutoField(primary_key=True)
    contactoption = models.ForeignKey(ContactOptions, on_delete=models.CASCADE)
    order = models.IntegerField(null=False, blank=False)
    question = models.CharField(max_length=200, null=False, blank=False)
    blockclass = models.CharField(max_length=50, null=True, blank=True)
    labelclass = models.CharField(max_length=50, null=True, blank=True)
    inputclass = models.CharField(max_length=50, null=True, blank=True)
    type = [
        ('BTN', 'button'), ('CKB', 'checkbox'), ('COL', 'color'),
        ('DAT', 'date'), ('DTL', 'datetime-local'), ('BTN', 'email'),
        ('FIL', 'file'), ('HDN', 'hidden'), ('IMG', 'image'),
        ('MON', 'month'), ('NUM', 'number'), ('PWD', 'password'),
        ('RAD', 'radio'), ('RNG', 'range'), ('RST', 'reset'),
        ('SRC', 'search'), ('TEL', 'tel'), ('TXT', 'text'),
        ('TIM', 'time'), ('URL', 'url'), ('WEK', 'week'),
    ]
    selectoptions = models.CharField(max_length=500)
    multiselection = models.BooleanField(null=False, blank=False,
                                         default=False)
    charlimit = models.IntegerField(null=True, blank=True, default=500)

    def __str__(self):
        return self.question


# anything after this is not exclusive to this website


class Socials(models.Model):
    '''
    This class is used to define the various social media links
    this table will be the same for every website owner apart from
    the links
    '''
    brand = models.CharField(max_length=30, null=False, blank=False)
    fontawesome = models.CharField(max_length=50, null=False, blank=False)
    link = models.CharField(max_length=150, null="true", blank="true")
    display = models.BooleanField(null=False, blank=False, default=True)

    def __str__(self):
        return self.brand
