from django.contrib import admin
from .models import (AdminFunctions, SecurityFunctions, ComplianceFunctions,
                     EvolvingFunctions, Socials, ImportantOptions,
                     ContactOptions, FormQuestions, UserProfile, Selectoptions,
                     RequestTickets, QAndA, ImportantOptionsMarketing, ClientsAndGroups,
                     ClientGalleryPage)

# Register your models here.
admin.site.register(AdminFunctions)
admin.site.register(SecurityFunctions)
admin.site.register(ComplianceFunctions)
admin.site.register(EvolvingFunctions)
admin.site.register(Socials)
admin.site.register(ImportantOptions)
admin.site.register(ContactOptions)
admin.site.register(FormQuestions)
admin.site.register(UserProfile)
admin.site.register(Selectoptions)
admin.site.register(RequestTickets)
admin.site.register(QAndA)
admin.site.register(ImportantOptionsMarketing)
admin.site.register(ClientsAndGroups)
admin.site.register(ClientGalleryPage)
