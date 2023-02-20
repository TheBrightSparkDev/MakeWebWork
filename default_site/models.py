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
    name = models.CharField(max_length=30, null=False, blank=False)
    description = models.CharField(max_length=500, null=False, blank=False)
    displayorder = models.IntegerField()
    display = models.BooleanField(default=True)
    
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
    typechoices = [
        ('button', 'button'), ('checkbox', 'checkbox'), ('color', 'color'),
        ('date', 'date'), ('datetime-local', 'datetime-local'),
        ('email', 'email'), ('file', 'file'), ('hidden', 'hidden'),
        ('image', 'image'), ('month', 'month'), ('number', 'number'), 
        ('password', 'password'), ('radio', 'radio'), ('range', 'range'), 
        ('reset', 'reset'), ('search', 'search'), ('tel', 'tel'), 
        ('text', 'text'), ('time', 'time'), ('url', 'url'), 
        ('week', 'week'), ('select', 'select')
    ]
    type = models.CharField(max_length=50, null=True, blank=True,
                            choices=typechoices)
    multiselection = models.BooleanField(null=False, blank=False,
                                         default=False)
    charlimit = models.IntegerField(null=True, blank=True, default=500)
    placeholdertext = models.CharField(max_length=500, null=True, blank=True)
    required = models.BooleanField(null=False, blank=False,
                                   default=True)

    def __str__(self):
        return self.question


class Selectoptions(models.Model):
    '''
    This class serves as a way to add mulitple options in a selectbox
    for the form question if the form question has the type of select
    '''
    ID = models.BigAutoField(primary_key=True)
    formquestion = models.ForeignKey(FormQuestions, on_delete=models.CASCADE)
    optionname = models.CharField(max_length=100, null=False, blank=False)
    order = models.IntegerField(null=False, blank=False)

    def __str__(self):
        name = self.formquestion.question + " option: " + self.optionName
        return name

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
