from storages.backends.azure_storage import AzureStorage
import os

is_live = os.environ.get("LIVE", "").lower() == "true"

if is_live:
    account_key_os = os.environ.get('MAKEWEBWORKLIVESTATIC')
    account_name_os = os.environ.get("MAKEWEBWORKSTATICNAME")
else:
    account_key_os = os.environ.get("MAKEWEBWORKSTATIC")
    account_name_os = "makewebworkstatic"

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
