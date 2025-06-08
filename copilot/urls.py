from django.urls import path
from . import views

urlpatterns = [
    path('', views.copilotHome, name='copilot-home'),
    path('marketing/<str:projectName>/', views.marketingCopilot, name='marketing-copilot'),
    path('web/<str:projectName>/', views.webCopilot, name='web-copilot'),
    path('upload-media/', views.upload_media, name='upload-media'),
    # Updated unified cycle view
    path('copilot/media/cycle/', views.cycleMediaClasses, name='cycleMedia'),
    path('copilot/media/rename/', views.renameMedia, name='renameMedia'),
    path('copilot/media/delete/', views.delete_media, name='deleteMedia'),
    path('project/<int:project_id>/add-section/', views.add_project_section, name='addProjectSection'),
    path('load-editable-section/', views.load_editable_section, name='section_preview'),
]