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
from default_site.views import (home, important_to_me, design,
                                development, data, contact)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name="home"),
    path('design', design, name="design"),
    path('data', data, name="data"),
    path('development', development, name="development"),
    path('contact', contact, name="contact"),
    path('important', important_to_me, name="important"),
    path('accounts/', include('allauth.urls'))
]
