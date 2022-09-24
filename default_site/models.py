from django.db import models

# Create your models here.
# following classes are exclusive to this website


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


class importantOptions(models.Model):
    '''
    This class is used to define the various options customers
    might deem important to them allowing me to show them a 
    personalised answer to them
    '''

    name = models.CharField(max_length=30, null=False, blank=False)
    description = models.CharField(max_length=250, null=False, blank=False)
    longdescription = models.CharField(max_length=1000, null=False, blank=False)
    display = models.BooleanField(null=False, blank=False, default=True)


# anything after this is not exclusive to this website

class socials(models.Model):
    '''
    This class is used to define the various social media links
    this table will be the same for every website owner apart from
    the links
    '''

    brand = models.CharField(max_length=30, null=False, blank=False)
    fontawesome = models.CharField(max_length=50, null=False, blank=False)
    link = models.CharField(max_length=150, null="true", blank="true")
    display = models.BooleanField(null=False, blank=False, default=True)