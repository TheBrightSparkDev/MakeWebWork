from django.contrib import admin
from .models import (Modules, Prices, SavedQuotes,
                    ModulesMarketing, PricesMarketing, SavedQuotesMarketing)
# Register your models here.

# web section
admin.site.register(Modules)
admin.site.register(Prices)
admin.site.register(SavedQuotes)

# marketing section
admin.site.register(ModulesMarketing)
admin.site.register(PricesMarketing)
admin.site.register(SavedQuotesMarketing)