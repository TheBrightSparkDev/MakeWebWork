from django.shortcuts import render
from .models import Modules, Prices, ModulesMarketing, PricesMarketing
from checkout.models import Invoice
from default_site.models import UserProfile, User
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from datetime import timezone, timedelta, datetime as dt
# for my own sanity
# pylint: disable=locally-disabled, multiple-statements, fixme, no-member

# Create your views here.


@login_required
@csrf_exempt
def journey(request, journey_page):
    '''
    This displays the page for the price calculator also takes an
    arguement to tell the system what page to start on.
    '''
    if request.method == "POST":
        profile = UserProfile.objects.get(user=request.user)
        amount = request.POST['amount']
        url = request.POST['newurl']
        print(amount)
        print(url)
        # create an invoiceitem
        invoice_item = Invoice(
            userprofile=profile,
            amounttopay=int(amount),
            created_on=dt.now(timezone.utc)
        )
        invoice_item.save()
        return render(request, 'checkout/checkout.html')

    context = {
        "modules": Modules.objects.all(),
        "prices": Prices.objects.all(),
        "journeypage": journey_page
    }
    return render(request, 'price_calculator/price_calculator.html', context)

@login_required
@csrf_exempt
def journeyMarketing(request, journey_page):
    '''
    This displays the page for the price calculator also takes an
    arguement to tell the system what page to start on.
    '''
    if request.method == "POST":
        profile = UserProfile.objects.get(user=request.user)
        amount = request.POST['amount']
        url = request.POST['newurl']
        print(amount)
        print(url)
        # create an invoiceitem
        invoice_item = Invoice(
            userprofile=profile,
            amounttopay=int(amount),
            created_on=dt.now(timezone.utc)
        )
        invoice_item.save()
        return render(request, 'checkout/checkout.html')

    context = {
        "modules": ModulesMarketing.objects.all(),
        "prices": PricesMarketing.objects.all(),
        "journeypage": journey_page
    }
    return render(request, 'price_calculator/marketing_price_calculator.html', context)