from django.shortcuts import render
from .models import Modules

# Create your views here.


def journey(request):
    '''
    This displays the page for the price calculator
    '''
    context = {
        "modules": Modules.objects.all()
    }
    return render(request, 'price_calculator/price_calculator.html', context)

