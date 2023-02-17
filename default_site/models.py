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
    password = models.CharField(max_length=30, null=False, blank=False)


class ContactOptions(models.Model):
    '''
    This class is used to define the various ways you can get in contact
    '''
    htmlId = models.CharField(max_length=30, null=False, blank=False)
    name = models.CharField(max_length=30, null=False, blank=False)
    description = models.CharField(max_length=500, null=False, blank=False)
    formQ1type = models.CharField(max_length=50, null=True, blank=True,
                                  default="text")
    formQ1Class = models.CharField(max_length=50, null=True, blank=True)
    formQ1number = models.IntegerField(null=True, blank=True, default=1)
    formQ1CharLimit = models.IntegerField(null=True, blank=True, default=500)
    formQ1 = models.CharField(max_length=100, null=True, blank=True)
    formQ2type = models.CharField(max_length=50, null=True, blank=True,
                                  default="text")
    formQ2Class = models.CharField(max_length=50, null=True, blank=True)
    formQ2number = models.IntegerField(null=True, blank=True, default=2)
    formQ2CharLimit = models.IntegerField(null=True, blank=True, default=500)
    formQ2 = models.CharField(max_length=100, null=True, blank=True)
    formQ3type = models.CharField(max_length=50, null=True, blank=True,
                                  default="text")
    formQ3Class = models.CharField(max_length=50, null=True, blank=True)
    formQ3number = models.IntegerField(null=True, blank=True, default=3)
    formQ3CharLimit = models.IntegerField(null=True, blank=True, default=500)
    formQ3 = models.CharField(max_length=100, null=True, blank=True)
    formQ4type = models.CharField(max_length=50, null=True, blank=True,
                                  default="text")
    formQ4Class = models.CharField(max_length=50, null=True, blank=True)
    formQ4number = models.IntegerField(null=True, blank=True, default=4)
    formQ4CharLimit = models.IntegerField(null=True, blank=True, default=500)
    formQ4 = models.CharField(max_length=100, null=True, blank=True)
    formQ5type = models.CharField(max_length=50, null=True, blank=True,
                                  default="text")
    formQ5Class = models.CharField(max_length=50, null=True, blank=True)
    formQ5number = models.IntegerField(null=True, blank=True, default=5)
    formQ5CharLimit = models.IntegerField(null=True, blank=True, default=500)
    formQ5 = models.CharField(max_length=100, null=True, blank=True)
    formQ6type = models.CharField(max_length=50, null=True, blank=True,
                                  default="text")
    formQ6Class = models.CharField(max_length=50, null=True, blank=True)
    formQ6number = models.IntegerField(null=True, blank=True, default=6)
    formQ6CharLimit = models.IntegerField(null=True, blank=True, default=500)
    formQ6 = models.CharField(max_length=100, null=True, blank=True)
    formQ7type = models.CharField(max_length=50, null=True, blank=True,
                                  default="text")
    formQ7Class = models.CharField(max_length=50, null=True, blank=True)
    formQ7number = models.IntegerField(null=True, blank=True, default=7)
    formQ7CharLimit = models.IntegerField(null=True, blank=True, default=500)
    formQ7 = models.CharField(max_length=100, null=True, blank=True)
    formQ8type = models.CharField(max_length=50, null=True, blank=True,
                                  default="text")
    formQ8Class = models.CharField(max_length=50, null=True, blank=True)
    formQ8number = models.IntegerField(null=True, blank=True, default=8)
    formQ8CharLimit = models.IntegerField(null=True, blank=True, default=500)
    formQ8 = models.CharField(max_length=100, null=True, blank=True)
    formQ9type = models.CharField(max_length=50, null=True, blank=True,
                                  default="text")
    formQ9Class = models.CharField(max_length=50, null=True, blank=True)
    formQ9number = models.IntegerField(null=True, blank=True, default=9)
    formQ9CharLimit = models.IntegerField(null=True, blank=True, default=500)
    formQ9 = models.CharField(max_length=100, null=True, blank=True)
    formQ10type = models.CharField(max_length=50, null=True, blank=True,
                                   default="text")
    formQ10Class = models.CharField(max_length=50, null=True, blank=True)
    formQ10number = models.IntegerField(null=True, blank=True, default=10)
    formQ10CharLimit = models.IntegerField(null=True, blank=True, default=500)
    formQ10 = models.CharField(max_length=100, null=True, blank=True)
    link = models.CharField(max_length=150, null=True, blank=True)
    display = models.BooleanField(null=False, blank=False, default=True)
    full = models.BooleanField(null=False, blank=False, default=False)

    def __str__(self):
        return self.name


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
