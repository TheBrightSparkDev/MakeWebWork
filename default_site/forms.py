from allauth.account.forms import SignupForm
from .models import UserProfile, User
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

class MyCustomSignupForm(SignupForm):

    def save(self, request):

        # Ensure you call the parent class's save.
        # .save() returns a User object.
        useracc = super(MyCustomSignupForm, self).save(request)

        # Add your own processing here.
        print(request.method)
        if request.method == "POST":
            profile = UserProfile(
                user=useracc
            )
            profile.save()
        # You must return the original result.
        return useracc