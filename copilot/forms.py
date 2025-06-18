from django import forms
from .models import Project

class ProjectForm(forms.ModelForm):
    class Meta:
        model = Project
        exclude = ['linkedUsers']
        widgets = {
            'projectLongDescription': forms.Textarea(attrs={'rows': 4}),
            'projectShortDescription': forms.Textarea(attrs={'rows': 2}),
            'marketing': forms.CheckboxInput(),
            'website': forms.CheckboxInput(),

            # Color pickers
            'colorOne': forms.TextInput(attrs={'type': 'color'}),
            'colorTwo': forms.TextInput(attrs={'type': 'color'}),
            'colorThree': forms.TextInput(attrs={'type': 'color'}),
            'colorFour': forms.TextInput(attrs={'type': 'color'}),
            'colorFive': forms.TextInput(attrs={'type': 'color'}),
            'backgroundColor': forms.TextInput(attrs={'type': 'color'}),
            'titleBackgroundColor': forms.TextInput(attrs={'type': 'color'}),
            # Text color fields will likely stay as text fields for class names like 'white-text'
        }
