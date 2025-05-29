from allauth.account.signals import email_confirmed
from django.dispatch import receiver
from django.conf import settings
import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException


@receiver(email_confirmed)
def send_welcome_email(request, email_address, **kwargs):
    user = email_address.user
    email = email_address.email

    configuration = sib_api_v3_sdk.Configuration()
    configuration.api_key['api-key'] = settings.BREVO_API_KEY
    api_instance = sib_api_v3_sdk.TransactionalEmailsApi(sib_api_v3_sdk.ApiClient(configuration))

    send_smtp_email = sib_api_v3_sdk.SendSmtpEmail(
        to=[{"email": email}],
        template_id=settings.BREVO_WELCOME_TEMPLATE_ID,
        params={
            "firstName": user.first_name,
        },
        headers={"X-Mailin-custom": "welcome-email"}
    )

    try:
        api_instance.send_transac_email(send_smtp_email)
    except ApiException as e:
        print(f"Failed to send welcome email: {e}")
