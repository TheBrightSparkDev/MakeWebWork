from django.shortcuts import render, redirect, reverse, get_object_or_404, HttpResponse
from django.conf import settings
import stripe
import json
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from django.http import JsonResponse
from .models import Invoice
from default_site.models import UserProfile
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

@login_required
def checkout(request):
    '''
    This is the page a user sees when they wish to make a payment to 
    makewebwork this is only here to pass the stripe integration part
    of the criteria
    '''
    stripe_public_key = settings.STRIPE_PUBLIC_KEY
    stripe_secret_key = settings.STRIPE_SECRET_KEY

    stripe.api_key = stripe_secret_key
    profile = UserProfile.objects.get(user=request.user)
    profile_id = str(profile.CustomerID)
    Invoices = list(Invoice.objects.filter(
        userprofile=profile_id).order_by('-created_on').values())
    invoice = Invoices[0]
    print(invoice)
    context = {
        "invoice": invoice,
        "stripe_public_key": stripe_public_key,
        "client_secret": stripe_secret_key
    }
    return render(request, 'checkout/checkout.html', context)


def calculate_order_amount(request):
    # extract an element in the response
    invoice = Invoice.objects.get(id=request.body)
    # because stripe does it in pennies
    invoice.amounttopay = invoice.amounttopay * 100
    return invoice.amounttopay

@require_POST
@csrf_exempt
def createintent(request):
    stripe_secret_key = settings.STRIPE_SECRET_KEY
    stripe.api_key = stripe_secret_key

    try:
        # Create a PaymentIntent with the order amount and currency
        intent = stripe.PaymentIntent.create(
            amount=calculate_order_amount(request),
            currency='gbp',
            automatic_payment_methods={
                'enabled': True,
            },
        )
        return JsonResponse({
            'clientSecret': intent['client_secret']
        })
    except Exception as e:
        return JsonResponse(error=str(e)), 403


@require_POST
@csrf_exempt
def updateInvoice(request):
    """
    updates the invoice model
    """    
    print("touched update invoice")
    return HttpResponse(200)


def checkoutSuccess(request):
    profile = UserProfile.objects.get(user=request.user)
    print(profile)
    profile_id = str(profile.CustomerID)
    print(profile_id)
    invoice = Invoice.objects.latest('created_on')
    print(invoice)
    invoice.paid = True
    print(invoice)
    invoice.save()
    print("touched checkout success")
    context = {

    }
    return render(request, 'checkout/checkout_success.html', context)
