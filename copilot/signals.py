from django.db.models.signals import pre_delete
from django.dispatch import receiver
from default_site.models import ClientsAndGroups, RequestTickets, UserProfile
from .models import Project  # Replace with your actual model name

@receiver(pre_delete, sender=ClientsAndGroups)
def handle_client_delete(sender, instance, **kwargs):
    project.objects.filter(LinkedClient=instance).update(active=False, LinkedClient=None)

@receiver(pre_delete, sender=RequestTickets)
def handle_request_delete(sender, instance, **kwargs):
    project.objects.filter(LinkedRequest=instance).update(active=False, LinkedRequest=None)

@receiver(pre_delete, sender=UserProfile)
def handle_user_delete(sender, instance, **kwargs):
    project.objects.filter(LinkedUser=instance).update(active=False, LinkedUser=None)