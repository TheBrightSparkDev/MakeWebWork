'''
This is where all the views live for the default site app

Default site is basically all the main pages of the website
it starts to diverge into other apps when we get into signing
in forms and placing orders
'''

from django.shortcuts import render, HttpResponse
from .models import (AdminFunctions, SecurityFunctions, ComplianceFunctions,
                     EvolvingFunctions, Socials, ImportantOptions,
                     ContactOptions)


# for my own sanity
# pylint: disable=locally-disabled, multiple-statements, fixme, no-member

# Create your views here.


def home(request):
    '''
    This is the home page there are no forms on this page just
    sections that depend upon data retrieved from the database
    '''
    context = {
        "CAF": AdminFunctions.objects.all(),
        "SW": SecurityFunctions.objects.all(),
        "CW": ComplianceFunctions.objects.all(),
        "EW": EvolvingFunctions.objects.all(),
        "socials": Socials.objects.all()
    }
    return render(request, 'default_site/homepage.html', context)


def design(request):
    '''
    This is the design page there are no forms on this page just
    the footer depends upon data retrieved from the database
    '''
    context = {
        "socials": Socials.objects.all()
    }
    return render(request, 'default_site/design.html', context)


def data(request):
    '''
    This is the data page there are no forms on this page just
    the footer depends upon data retrieved from the database
    '''
    context = {
        "socials": Socials.objects.all()
    }
    return render(request, 'default_site/data.html', context)


def development(request):
    '''
    This is the development page there are no forms on this page just
    the footer depends upon data retrieved from the database
    '''
    context = {
        "socials": Socials.objects.all()
    }
    return render(request, 'default_site/development.html', context)


def contact(request):
    '''
    This is the development page there are no forms on this page just
    links to pages that contain forms the reason I avoided forms on this
    is to keep all forms in another app so that troubleshooting forms in
    the future will be easier
    the tabs are created using data gathered from the database
    the footer depends upon data retrieved from the database
    '''
    if request.method == "POST":
        print("hello world")

    context = {
        "socials": Socials.objects.all(),
        "options": ContactOptions.objects.all()
    }
    return render(request, 'default_site/contact.html', context)


def important_to_me(request):
    '''
    This is what the horizontal scroll section is populated with
    '''
    context = {
        "socials": Socials.objects.all(),
        "options": ImportantOptions.objects.all()
    }
    return render(request, 'default_site/important_to_me.html', context)
