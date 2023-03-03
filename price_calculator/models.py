from django.db import models

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
