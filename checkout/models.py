from django.db import models

from default_site.models import UserProfile

# Create your models here.


class Invoice(models.Model):
    '''
    A table that contains the data for the various question and answers
    inputted on the input page. Linked by a contactoption for grouping
    purposes and context and linked to a request for retrieving it from
    the customer entity
    '''
    InvoiceID = models.BigAutoField(primary_key=True),
    amounttopay = models.IntegerField(null=False, blank=False),
    


