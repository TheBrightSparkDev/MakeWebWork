from django.shortcuts import render, HttpResponse
from .models import (AdminFunctions, SecurityFunctions, ComplianceFunctions, 
                     EvolvingFunctions, socials, importantOptions)

# Create your views here.

def home(request):
    # This is what the horizontal scroll section is populated with
    caf = AdminFunctions.objects.all()
    sw = SecurityFunctions.objects.all()
    cw = ComplianceFunctions.objects.all()
    ew = EvolvingFunctions.objects.all()
    footericons = socials.objects.all()
    context = {
        "CAF": caf,
        "SW": sw,
        "CW": cw,
        "EW": ew,
        "socials": footericons
    }
    return render(request, 'default_site/homepage.html', context)


def design(request):
    # This is the horizontal scroll section is populated with
    footericons = socials.objects.all()
    context = {
        "socials": footericons
    }
    return render(request, 'default_site/design.html', context)


def important_to_me(request):
    # This is the horizontal scroll section is populated with
    footericons = socials.objects.all()
    options = importantOptions.objects.all()
    context = {
        "socials": footericons,
        "options": options
    }
    return render(request, 'default_site/important_to_me.html', context)