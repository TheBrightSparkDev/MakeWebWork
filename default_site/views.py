from django.shortcuts import render, HttpResponse

# Create your views here.

def home(request):
    return render(request, 'default_site/homepage.html')