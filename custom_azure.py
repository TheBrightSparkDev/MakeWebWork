from storages.backends.azure_storage import AzureStorage
import os



account_key_os = os.environ.get('MAKEWEBWORKSTATIC')
# account_key_os = ''
account_name_os = os.environ.get('MAKEWEBWORKSTATICNAME')

class AzureMediaStorage(AzureStorage):
    account_name = account_name_os
    account_key = account_key_os
    azure_container = 'media'
    expiration_secs = None

class AzureStaticStorage(AzureStorage):
    account_name = account_name_os
    account_key = account_key_os
    azure_container = 'static'
    expiration_secs = None
