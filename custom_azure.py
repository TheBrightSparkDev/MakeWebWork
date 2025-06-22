from storages.backends.azure_storage import AzureStorage
import os

is_live = os.environ.get("LIVE", "").lower() == "true"

if is_live:
    account_name = os.environ.get("MAKEWEBWORKSTATICNAME")
    account_key = os.environ.get("MAKEWEBWORKLIVESTATIC")
else:
    account_name = "makewebworkstatic"
    account_key = os.environ.get("MAKEWEBWORKSTATIC")

class AzureMediaStorage(AzureStorage):
    account_name = account_name
    account_key = account_key
    azure_container = 'media'
    expiration_secs = None

class AzureStaticStorage(AzureStorage):
    account_name = account_name
    account_key = account_key
    azure_container = 'static'
    expiration_secs = None