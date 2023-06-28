from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect
from default_site.views import home
from default_site.models import (ContactOptions, FormQuestions,
                                 QAndA, RequestTickets, UserProfile,
                                 Selectoptions)

# for my own sanity
# pylint: disable=locally-disabled, multiple-statements, fixme, no-member
# Create your views here.

@login_required
def admin_dashboard(request):
    '''
    This page is only accessible to superusers just like the
    standard admin site. The dafault render therefore is a redirect
    to the home page and authentication is required at a minimum just
    to render this view this will be the same on all of the views in 
    this file. This is a homepage for admin user to manage some areas
    of the site.
    '''
    if request.user.is_superuser:
        
        profile = UserProfile.objects.get(user=request.user)

        context = {
            "Requests": RequestTickets.objects.all(),
            "profile": profile
        }
        return render(request, 'customadmin/admindashboard.html', context)
    return redirect(home)


@login_required
def requests(request):
    '''
    This is the place the admin can go to to view all open requests
    sent by the users of the site
    '''

    if request.user.is_superuser:
        context = {
            "Users": UserProfile.objects.all(),
            "Requests": RequestTickets.objects.all(),
            "QandAs": QAndA.objects.all(),
            "selectoptions": Selectoptions.objects.all(),
            "questions": FormQuestions.objects.all(),
            "options": ContactOptions.objects.all().order_by("displayorder").values() # noqa
        }
        return render(request, 'customadmin/requests.html', context)
    return redirect(home)


@login_required
def update_contact(request):
    '''
    This is where the admin can go to change the questions visible
    to users on the contact us page
    '''
    if request.user.is_superuser:
        context = {
        "selectoptions": Selectoptions.objects.all(),
        "questions": FormQuestions.objects.all(),
        "options": ContactOptions.objects.all().order_by("displayorder").values() # noqa
        }
        return render(request, 'customadmin/updatecontact.html', context)
    return redirect(home)
