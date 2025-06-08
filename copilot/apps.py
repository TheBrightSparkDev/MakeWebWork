from django.apps import AppConfig


class CopilotConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'copilot'

    def ready(self):
        import copilot.signals  # Make sure this matches your app name
