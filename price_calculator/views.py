from django.shortcuts import render
from .models import Modules, Prices
from checkout.models import Invoice
from default_site.models import UserProfile, User
from django.views.decorators.csrf import csrf_exempt
from datetime import timezone, timedelta, datetime as dt
# for my own sanity
# pylint: disable=locally-disabled, multiple-statements, fixme, no-member

# Create your views here.

@csrf_exempt
def journey(request):
    '''
    This displays the page for the price calculator
    '''
    if request.method == "POST":
        profile = UserProfile.objects.get(user=request.user)
        amount = request.POST['amount']
        print(amount)
        # create an invoiceitem
        invoice_item = Invoice(
            userprofile=profile,
            amounttopay=int(amount),
            created_on=dt.now(timezone.utc)
        )
        invoice_item.save()

    context = {
        "modules": Modules.objects.all(),
        "prices": Prices.objects.all()
    }
    return render(request, 'price_calculator/price_calculator.html', context)

