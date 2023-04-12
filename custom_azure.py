from storages.backends.azure_storage import AzureStorage
import os

account_key_os = os.environ.get('MAKEWEBWORKSTATIC')

class AzureMediaStorage(AzureStorage):
    account_name = 'makewebworkstatic'
    account_key = 'YMVsKadbbKHmo0Qqgn4PrJXST8Tm+L4Vs8+7+P0zDltyUrG1PKbGSn3i75LU/kGoy6jQzttekduh+AStsHmYJg=='
    azure_container = 'media'
    expiration_secs = None

class AzureStaticStorage(AzureStorage):
    account_name = 'makewebworkstatic'
    account_key = 'YMVsKadbbKHmo0Qqgn4PrJXST8Tm+L4Vs8+7+P0zDltyUrG1PKbGSn3i75LU/kGoy6jQzttekduh+AStsHmYJg=='
    azure_container = 'static'
    expiration_secs = None
