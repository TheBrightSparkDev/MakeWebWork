'''
This is where all the views live for the default site app

Default site is basically all the main pages of the website
it starts to diverge into other apps when we get into signing
in forms and placing orders
'''

from django.shortcuts import render, HttpResponse
from .models import (AdminFunctions, SecurityFunctions, ComplianceFunctions,
                     EvolvingFunctions, Socials, ImportantOptions,
                     ContactOptions, FormQuestions, Selectoptions)
from django.contrib.auth.decorators import login_required

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


@login_required
def contact(request):
    '''
    This is the development page there are no forms on this page just
    links to pages that contain forms the reason I avoided forms on this
    is to keep all forms in another app so that troubleshooting forms in
    the future will be easier
    the tabs are created using data gathered from the database
    the footer depends upon data retrieved from the database
    Make sure if you update the amount of questions available in the contact
    model you change the variable numberofquestionsperblock here
    '''
    if request.method == "POST":
        # need a javascript function to handle this and get
        # additional data from the front end I need the form to handle
        # a small amount of data multiple times and I also need for the
        # form to hold all the metadata like the question time and the 
        # contactoption it related to not 100% sure on how and cant guarantee
        # it will be clean or pretty but its the choices I have made in order to
        # make the form as flexible as possible so it can be reused in many 
        # scenarios
        form_data = {
            'full_name': request.POST['full_name'],
            'email': request.POST['email'],
            'phone_number': request.POST['phone_number'],
            'country': request.POST['country'],
            'postcode': request.POST['postcode'],
            'town_or_city': request.POST['town_or_city'],
            'street_address1': request.POST['street_address1'],
            'street_address2': request.POST['street_address2'],
            'county': request.POST['county'],
        }

        order_form = OrderForm(form_data)

    context = {
        "selectoptions": Selectoptions.objects.all(),
        "questions": FormQuestions.objects.all(),
        "socials": Socials.objects.all(),
        "options": ContactOptions.objects.all().order_by("displayorder").values() # noqa
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
