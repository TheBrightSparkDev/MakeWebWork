'''
This is where all the views live for the default site app

Default site is basically all the main pages of the website
it starts to diverge into other apps when we get into signing
in forms and placing orders
'''
from datetime import timezone, timedelta, datetime as dt
from django.shortcuts import render, HttpResponse
from .models import (AdminFunctions, SecurityFunctions, ComplianceFunctions,
                     EvolvingFunctions, Socials, ImportantOptions,
                     ContactOptions, FormQuestions, Selectoptions,
                     UserProfile, RequestTickets, QAndA, User)
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
    This is possibly the most complex way of asking a few questions
    I could possibly think of why you ask? so that I
    can have any amount of questions with any value
    and any answer. You could literally go to the
    database add a new question to the question model
    and bam it is displayed and handled as long as you
    set the answers charlimit under 2000
    '''
    if request.method == "POST":
        profile = UserProfile.objects.get(user=request.user)
        request_id = GetOrCreateRequest(profile)
        
        contactoptionID = ContactOptions.objects.get(
            id=request.POST['contactoptionID'])

        q_and_a_item = QAndA(
            question=request.POST['question'],
            order=request.POST['order'],
            answer=request.POST['answer'],
            relatedcontactoption=contactoptionID,
            date_created=dt.now(timezone.utc),
            requestID_id=request_id,
        )
        q_and_a_item.save()

    context = {
        "selectoptions": Selectoptions.objects.all(),
        "questions": FormQuestions.objects.all(),
        "socials": Socials.objects.all(),
        "options": ContactOptions.objects.all().order_by("displayorder").values() # noqa
    }
    return render(request, 'default_site/contact.html', context)


def GetOrCreateRequest(profile):
    requests = list(RequestTickets.objects.filter(customerID=profile))
    createnew = False
    if requests:
        for request in requests:
            now = dt.now(timezone.utc) - timedelta(hours=4)
            requesttime = request.created_on
            if now > requesttime:
                # create new request
                createnew = True
            else:
                # this is a request that is less than 4 hours old
                print("user old request")
                return request.requestID
    else:
        # create new request
        createnew = True
    if createnew is True:
        print("creating new request")
        request = RequestTickets(
                created_on=dt.now(timezone.utc),
                customerID=profile,
                )
        request.save()
        return request.requestID


def important_to_me(request):
    '''
    This is what the horizontal scroll section is populated with
    '''
    context = {
        "socials": Socials.objects.all(),
        "options": ImportantOptions.objects.all()
    }
    return render(request, 'default_site/important_to_me.html', context)
