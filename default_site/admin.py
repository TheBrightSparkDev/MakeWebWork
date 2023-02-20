from django.contrib import admin
from .models import (AdminFunctions, SecurityFunctions, ComplianceFunctions,
                     EvolvingFunctions, Socials, ImportantOptions,
                     ContactOptions, FormQuestions, Customer, Selectoptions)

# Register your models here.
admin.site.register(AdminFunctions)
admin.site.register(SecurityFunctions)
admin.site.register(ComplianceFunctions)
admin.site.register(EvolvingFunctions)
admin.site.register(Socials)
admin.site.register(ImportantOptions)
admin.site.register(ContactOptions)
admin.site.register(FormQuestions)
admin.site.register(Customer)
admin.site.register(Selectoptions)
