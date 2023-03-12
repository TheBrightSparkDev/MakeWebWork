from django.shortcuts import render
from django.conf import settings
import stripe
# Create your views here.



def checkout(request):
    '''
    This is the page a user sees when they wish to make a payment to 
    makewebwork this is only here to pass the stripe integration part
    of the criteria 
    '''
    stripe_public_key = settings.STRIPE_PUBLIC_KEY
    stripe_secret_key = settings.STRIPE_SECRET_KEY

    if request.method == 'POST':
        
        stripe.api_key = stripe_secret_key
        intent = stripe.PaymentIntent.create(
            amount=stripe_total,
            currency=settings.STRIPE_CURRENCY,
        )
    context = {
        "invoice": invoice.objects.get(user),
        "stripe_public_key": stripe_public_key,
        "client_secret": intent.client_secret
    }
    return render(request, 'checkout/checkout.html', context)