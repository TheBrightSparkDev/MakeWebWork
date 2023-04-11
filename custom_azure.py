from storages.backends.azure_storage import AzureStorage
import os

if os.getenv('DEVELOPMENT', ''):
    ACCOUNT_KEY = os.getenv('MAKEWEBWORKSTATIC', '')

else:
    STRIPE_PUBLIC_KEY = os.environ.get('MAKEWEBWORKSTATIC')

class AzureMediaStorage(AzureStorage):
    account_name = 'makewebworkstatic'
    account_key = ACCOUNT_KEY
    azure_container = 'media'
    expiration_secs = None

class AzureStaticStorage(AzureStorage):
    account_name = 'makewebworkstatic'
    account_key = ACCOUNT_KEY
    azure_container = 'static'
    expiration_secs = None
