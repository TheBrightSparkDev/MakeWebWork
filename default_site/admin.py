from django.contrib import admin
from .models import (AdminFunctions, SecurityFunctions, ComplianceFunctions, 
                     EvolvingFunctions, socials, importantOptions)

# Register your models here.
admin.site.register(AdminFunctions)
admin.site.register(SecurityFunctions)
admin.site.register(ComplianceFunctions)
admin.site.register(EvolvingFunctions)
admin.site.register(socials)
admin.site.register(importantOptions)
