from django.shortcuts import render
from .models import Modules, Prices

# for my own sanity
# pylint: disable=locally-disabled, multiple-statements, fixme, no-member

# Create your views here.


def journey(request):
    '''
    This displays the page for the price calculator
    '''
    context = {
        "modules": Modules.objects.all(),
        "prices": Prices.objects.all()
    }
    return render(request, 'price_calculator/price_calculator.html', context)

