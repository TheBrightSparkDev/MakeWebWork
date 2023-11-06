'''
This is where all the views live for the default site app

Default site is basically all the main pages of the website
it starts to diverge into other apps when we get into signing
in forms and placing orders
'''
from datetime import timezone, timedelta, datetime as dt
from checkout.models import Invoice
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


@login_required
def account(request):
    '''
    This displays the profile page and gives the user the ability
    to sign out and manage their contact preferances. It also allows them
    to edit their previous requests and contains messages from the admin.
    '''
    profile = UserProfile.objects.get(user=request.user)
    invoice = Invoice.objects.filter(userprofile=profile)
    context = {
        "profile": profile,
        "invoices": invoice
    }
    
    return render(request, 'default_site/profile.html', context)


@login_required
def edit_profile(request):
    '''
    This displays the profile page and gives the user the ability
    to sign out and manage their contact preferances. It also allows them
    to edit their previous requests and contains messages from the admin.
    '''
    profile = UserProfile.objects.get(user=request.user)
    invoice = Invoice.objects.filter(userprofile=profile)
    if request.method == "POST":
        print(request.POST)
        # This is to correct the values that are returned from the html
        # since it returns "on" if checkbox is ticked nothing if checkbox
        # is empty. I could use value on the html but this seems a more
        # secure way to do the same

        con_via_phone = False
        con_via_email = False
        con_via_text = False
        uk_resident_value = False
        try:
            if request.POST['Contact_via_phone']:
                print("con_via_phone = True")
                con_via_phone = True
        except KeyError:
            print("NameError on phone")
        try:
            if request.POST['Contact_via_email']:
                print("con_via_email = True")
                con_via_email = True
        except KeyError:
            print("NameError on email")    
        try:           
            if request.POST['UK_resident']:
                print("uk_resident_value = True")
                uk_resident_value = True
        except KeyError:
            print("KeyError on uk resident")
        try:
            if request.POST['Contact_via_text']:
                print("con_via_text = True")
                con_via_text = True
        except KeyError:
            print("KeyError on text")

        profile_item = UserProfile(
            CustomerID=profile.CustomerID,
            user=profile.user,
            First_name=request.POST['First_Name'],
            Last_name=request.POST['Last_Name'],
            Phone_number=request.POST['Phone_number'],
            House_number_or_name=request.POST['House_number'],
            Address_line_one=request.POST['Street_Name'],
            Town=request.POST['Town'],
            Uk_resident=uk_resident_value,
            Postcode=request.POST['Postcode'],
            County=request.POST['County'],
            Contact_via_email=con_via_email,
            Contact_via_phone=con_via_phone,
            Contact_via_text=con_via_text,
            Birth_date=request.POST['DOB'],
        )
        profile_item.save()
    context = {
        "profile": profile
    }
    return render(request, 'default_site/edit_profile.html', context)


def GetOrCreateRequest(profile):
    '''
    This method checks if the user has created a request recently if a
    request was made in the last 4 hours the system will use that
    request instead of creating a new one.
    '''
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
                return request.requestID
    else:
        # create new request
        createnew = True
    if createnew is True:
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
