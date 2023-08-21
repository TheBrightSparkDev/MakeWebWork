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
    userprofile = models.ForeignKey(UserProfile, on_delete=models.RESTRICT)
    amounttopay = models.IntegerField(null=False, blank=False)
    paid = models.BooleanField(default=False)
    created_on = models.DateTimeField()

    def __str__(self):
        return self.userprofile.user.username

