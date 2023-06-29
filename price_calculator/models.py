from django.db import models
from default_site.models import UserProfile

# Create your models here.


class Modules(models.Model):
    '''
    This class will define the modules model it includes data about price
    description and development time
    '''

    moduleID = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=50, null=False, blank=False)
    description = models.CharField(max_length=1000, null=False, blank=False)
    cost = models.CharField(max_length=50, null=False, blank=False)
    devtimedays = models.IntegerField(null=False, blank=False, default=True)
    available = models.BooleanField(default=False)
    comingsoon = models.BooleanField(default=False)
    releasedate = models.DateField(null=True, blank=True)
    readmorelink = models.CharField(blank=True, null=True, max_length=200)

    def __str__(self):
        return self.name


class Prices(models.Model):
    '''
    This class will define the prices model it includes data about price
    description and development time for things that arent models
    '''
    pricesID = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=50, null=False, blank=False)
    description = models.CharField(max_length=1000, null=True, blank=True)
    price = models.IntegerField(null=False, blank=False, default=True)

    def __str__(self):
        return self.name


class SavedQuotes(models.Model):
    '''
    This class will define the SavedQuotes model it will contain information
    about the options selected on the quotes page.
    '''
    # Primary ID
    QuoteID = models.BigAutoField(primary_key=True)
    # Customer ID
    CustomerID = models.ForeignKey(UserProfile, on_delete=models.RESTRICT)
    # ID of selected models
    SelectedModules = models.CharField(max_length=50, null=True, blank=True)
    # What journey page to display the info on
    JourneyPage = models.CharField(max_length=50, null=False, blank=False)
    # Amount of things
    AmountOfPages = models.IntegerField(null=True, blank=True)
    AmountOfProducts = models.IntegerField(null=True, blank=True)
    AmountOfSubscribers = models.IntegerField(null=True, blank=True)
    AmountOfTraffic = models.IntegerField(null=True, blank=True)
    AmountOfData = models.IntegerField(null=True, blank=True)
    # Cost of the above amounts
    CostOfPages = models.IntegerField(null=True, blank=True)
    CostOfProducts = models.IntegerField(null=True, blank=True)
    CostOfSubscribers = models.IntegerField(null=True, blank=True)
    CostOfTraffic = models.IntegerField(null=True, blank=True)
    CostOfData = models.IntegerField(null=True, blank=True)
    # Final values
    Deposit = models.IntegerField(null=True, blank=True)
    Total = models.IntegerField(null=True, blank=True)
    # Meta info
    DateOfQuote = models.DateField(null=False, blank=False)
    NameOfQuote = models.CharField(max_length=50, null=False, blank=False)

    def __str__(self):
        return self.NameOfQuote + ": " + self.DateOfQuote