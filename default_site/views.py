from django.shortcuts import render, HttpResponse
from .models import (AdminFunctions, SecurityFunctions, ComplianceFunctions, 
                     EvolvingFunctions)

# Create your views here.

def home(request):
    caf = AdminFunctions.objects.all()
    sw = SecurityFunctions.objects.all()
    cw = ComplianceFunctions.objects.all()
    ew = EvolvingFunctions.objects.all()
    context = {
        "CAF": caf,
        "SW": sw,
        "CW": cw,
        "EW": ew
    }
    return render(request, 'default_site/homepage.html', context)
