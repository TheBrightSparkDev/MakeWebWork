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


def formCreator(formData):
    '''
    If the customer form name ever gets changed update customerForm value too
    '''
    customerForm = "I am a human"
    data = []
    questionKeys = []
    i = 1
    while i <= 20:
        option = "formQ" + str(i)
        questionKeys.append(option)
        i = i + 1

    for line in formData:
        if line.name == customerForm:
            # this makes I am human always display first
            data.insert(0, line.name)
        else:
            data.append(line.name)
        for question in questionKeys:
            if line[str(question)] != "":
                data[line.name][question] = line[str(question)]
    return data


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

    question_groups = ContactOptions.objects.all()
    form = formCreator(question_groups)

    if request.method == "POST":
        print("hello world")

    context = {
        "form": form,
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
