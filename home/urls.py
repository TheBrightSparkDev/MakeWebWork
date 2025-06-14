"""home URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from default_site.views import (home, important_to_me, design,
                                development, data, contact, account,
                                edit_profile, important_to_me_marketing,
                                galleryPage, gallery)
from price_calculator.views import (journey, journeyMarketing)
from checkout.views import (checkout, createintent, updateInvoice,
                            checkoutSuccess)
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    # default site paths
    path('', home, name="home"),
    path('design', design, name="design"),
    path('gallery', gallery, name="gallery"),
    path('galleryPage/<slug:service_name>/', galleryPage, name='galleryPage'),
    path('data', data, name="data"),
    path('development', development, name="development"),
    path('contact', contact, name="contact"),
    path('important', important_to_me, name="important"),
    path('important_marketing', important_to_me_marketing, name="important_marketing"),
    path('accounts/', include('allauth.urls')),
    path('account', account, name="account"),
    path('editAccount', edit_profile, name="editAccount"),
    # price calculator paths
    path('price_calculator/<journey_page>', journey, name="journey"),
    path('price_calculator_marketing/<journey_page>', journeyMarketing, name="marketing"),
    # checkout paths
    path('checkout', checkout, name="checkout"),
    path('createintent', createintent, name="createintent"),
    path('updateInvoice', updateInvoice, name="updateInvoice"),
    path('checkout_success', checkoutSuccess, name="checkout_success"),
    # admin paths
    path('admin_dashboard/', include('customadmin.urls')),
    path('copilot/', include('copilot.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
