"""
Django settings for home project.

Generated by 'django-admin startproject' using Django 4.1.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""

from pathlib import Path
import os
import runpy
from django.core.mail import send_mail

env_path = os.path.join(os.path.dirname(__file__), "env.py")
if os.path.exists(env_path):
    runpy.run_path(env_path)
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-mor2j7g3xb1m^*l0il&_=f9s2ftlxv*@b+8m%0r0x+zpkb!7i4'

# SECURITY WARNING: don't run with debug turned on in production!
PRODUCTION = os.getenv("PRODUCTION", "False") == "True"
DEVELOPMENT = os.getenv("DEVELOPMENT", "False") == "True"
DEBUG = DEVELOPMENT and not PRODUCTION

ALLOWED_HOSTS = ['8000-thebrightsp-makewebwork-s2cd4pfok8p.ws-eu120.gitpod.io','makewebwork.azurewebsites.net','makewebwork.co.uk']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # added this for the comments area
    'django.contrib.humanize',
    # my applications
    'default_site',
    'home',
    'price_calculator',
    'checkout',
    'copilot',
    # admin page
    'customadmin',
    # for allauth
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
# This is my fix for the signup issues not creating a relevant userprofile model
# this was causing many funcitons to fail on the website 
# (anything that wrote or used the userprofile model)
ACCOUNT_FORMS = {'signup': 'default_site.forms.MyCustomSignupForm'}

ROOT_URLCONF = 'home.urls'

CSRF_TRUSTED_ORIGINS = ['https://8000-thebrightsp-makewebwork-s2cd4pfok8p.ws-eu120.gitpod.io/*',
                        'https://makewebwork.azurewebsites.net/*','https://makewebwork.co.uk/*']

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'templates'),
            os.path.join(BASE_DIR, 'templates', 'allauth'),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                # context_processors.auth is required by allauth
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'django.template.context_processors.static',
            ],
        },
    },
]

# this is technically not needed but declared regardless
MESSAGE_STORAGE = 'django.contrib.messages.storage.session.SessionStorage'

AUTHENTICATION_BACKENDS = [
    # Needed to login by username in Django admin, regardless of `allauth`
    'django.contrib.auth.backends.ModelBackend',

    # `allauth` specific authentication methods, such as login by e-mail
    'allauth.account.auth_backends.AuthenticationBackend',
]

SITE_ID = 1

WSGI_APPLICATION = 'home.wsgi.application'

# copy and pasted from boutique ado tutorial
DEFAULT_FROM_EMAIL = "no-reply@makewebwork.co.uk"
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_PORT = 2525
EMAIL_HOST = 'smtp-relay.brevo.com'
EMAIL_HOST_USER = "8e378d001@smtp-brevo.com"
# This isn't actually the main password. This password only works
# via this paritcular smtp service therefore this is technically safe
# to have in my code hardcoded. 
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD")

BREVO_API_KEY = os.getenv("BREVO_API_KEY")
BREVO_WELCOME_TEMPLATE_ID = 1

ACCOUNT_AUTHENTICATION_METHOD = 'username_email'
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_EMAIL_VERIFICATION = 'none'
ACCOUNT_SIGNUP_EMAIL_ENTER_TWICE = True
ACCOUNT_USERNAME_MIN_LENGTH = 4
LOGIN_URL = '/accounts/login/'
LOGIN_REDIRECT_URL = '/'

# copy and pasted from boutique ado tutorial

# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/


STATIC_URL = '/static/'
MEDIA_URL = '/images/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static')
]


# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
# stripe
STRIPE_CURRENCY = 'gbp'
if os.getenv('DEVELOPMENT', ''):
    STRIPE_PUBLIC_KEY = os.getenv('STRIPE_PUBLIC_KEY', '')
    STRIPE_SECRET_KEY = os.getenv('STRIPE_SECRET_KEY', '')
    STRIPE_WH_SECRET = os.getenv('STRIPE_WH_SECRET', '')
else:
    STRIPE_PUBLIC_KEY = os.environ.get('STRIPE_PUBLIC_KEY')
    STRIPE_SECRET_KEY = os.environ.get('STRIPE_SECRET_KEY')
    STRIPE_WH_SECRET = os.environ.get('STRIPE_WH_SECRET')


collectstatic = False
sendToProduction = False  
if sendToProduction == True:
    if collectstatic == True:
        # collectstatic live
        AZURE_ACCOUNT_KEY = os.environ.get("AZURE_ACCOUNT_KEY")  # Secure access key
        DEFAULT_FILE_STORAGE = 'custom_azure.AzureMediaStorage'
        STATICFILES_STORAGE = 'custom_azure.AzureStaticStorage'
        STATIC_LOCATION = "static"
        MEDIA_LOCATION = "media"
        AZURE_ACCOUNT_NAME = "makewebworklivestatic"
        print("Account Name:", os.environ.get("AZURE_ACCOUNT_NAME"))
        print("Account Key:", os.environ.get("AZURE_ACCOUNT_KEY"))
        AZURE_CUSTOM_DOMAIN = f"{AZURE_ACCOUNT_NAME}.blob.core.windows.net"
        STATIC_URL = f"https://{AZURE_CUSTOM_DOMAIN}/{STATIC_LOCATION}/"
        MEDIA_URL = f"https://{AZURE_CUSTOM_DOMAIN}/{MEDIA_LOCATION}/"
else:
    if collectstatic == True:
        # collectStatic test
        DEFAULT_FILE_STORAGE = 'custom_azure.AzureMediaStorage'
        STATICFILES_STORAGE = 'custom_azure.AzureStaticStorage'
        STATIC_LOCATION = "static"
        MEDIA_LOCATION = "media"
        AZURE_ACCOUNT_NAME = "makewebworkstatic"
        AZURE_CUSTOM_DOMAIN = f'{AZURE_ACCOUNT_NAME}.blob.core.windows.net'
        STATIC_URL = f'https://{AZURE_CUSTOM_DOMAIN}/{STATIC_LOCATION}/'
        MEDIA_URL = f'https://{AZURE_CUSTOM_DOMAIN}/{MEDIA_LOCATION}/'
    else:
        # test
        if os.getenv('PRODUCTION') == "True":
            DEFAULT_FILE_STORAGE = 'custom_azure.AzureMediaStorage'
            STATICFILES_STORAGE = 'custom_azure.AzureStaticStorage'
            STATIC_LOCATION = "static"
            MEDIA_LOCATION = "media"
            AZURE_ACCOUNT_NAME = "makewebworkstatic"
            AZURE_CUSTOM_DOMAIN = f'{AZURE_ACCOUNT_NAME}.blob.core.windows.net'
            STATIC_URL = f'https://{AZURE_CUSTOM_DOMAIN}/{STATIC_LOCATION}/'
            MEDIA_URL = f'https://{AZURE_CUSTOM_DOMAIN}/{MEDIA_LOCATION}/'

        elif os.environ('LIVE') == "True":
            # live
            AZURE_ACCOUNT_KEY = os.environ.get("AZURE_ACCOUNT_KEY")  # Secure access key
            DEFAULT_FILE_STORAGE = 'custom_azure.AzureMediaStorage'
            STATICFILES_STORAGE = 'custom_azure.AzureStaticStorage'
            STATIC_LOCATION = "static"
            MEDIA_LOCATION = "media"
            AZURE_ACCOUNT_NAME = "makewebworklivestatic"
            print("Account Name:", os.environ.get("AZURE_ACCOUNT_NAME"))
            print("Account Key:", os.environ.get("AZURE_ACCOUNT_KEY"))
            AZURE_CUSTOM_DOMAIN = f"{AZURE_ACCOUNT_NAME}.blob.core.windows.net"
            STATIC_URL = f"https://{AZURE_CUSTOM_DOMAIN}/{STATIC_LOCATION}/"
            MEDIA_URL = f"https://{AZURE_CUSTOM_DOMAIN}/{MEDIA_LOCATION}/"
        else:
            # local 
            STATIC_URL = '/static/'
            MEDIA_URL = '/images/'
            STATICFILES_DIRS = [
                os.path.join(BASE_DIR, 'static')
            ]
