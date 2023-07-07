from django.contrib import admin
from .models import Modules, Prices, SavedQuotes
# Register your models here.

admin.site.register(Modules)
admin.site.register(Prices)
admin.site.register(SavedQuotes)
