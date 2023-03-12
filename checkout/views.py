from django.shortcuts import render
from django.conf import settings
import stripe
import json
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from django.http import JsonResponse
from .models import Invoice
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
    intent = stripe.PaymentIntent.create(
        amount=50,
        currency=settings.STRIPE_CURRENCY,
    )

    context = {
        "stripe_public_key": stripe_public_key,
        "client_secret": intent.client_secret
    }
    return render(request, 'checkout/checkout.html', context)


def calculate_order_amount():
    # Replace this constant with a calculation of the order's amount
    # Calculate the order total on the server to prevent
    # people from directly manipulating the amount on the client
    return 50

@require_POST
@csrf_exempt
def createintent(request):
    try:
        data = request
        # Create a PaymentIntent with the order amount and currency
        intent = stripe.PaymentIntent.create(
            amount=calculate_order_amount(),
            currency='gbp',
            automatic_payment_methods={
                'enabled': True,
            },
        )
        return JsonResponse({
            'clientSecret': intent.client_secret
        })
    except Exception as e:
        return JsonResponse(error=str(e)), 403
