from django.shortcuts import render

# Create your views here.


def journey(request):
    '''
    This displays the page for the price calculator
    '''
    return render(request, 'price_calculator/price_calculator.html')

