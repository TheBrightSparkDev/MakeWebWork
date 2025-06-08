from django.db import models
from default_site.models import ClientsAndGroups, RequestTickets, UserProfile
from django.utils import timezone
import os
# Copilot shared models


def get_upload_path(instance, filename, field_name):
    """
    Generates the upload path for UploadedMedia files based on the client name.
    """

    try:
        client_name = instance.projectPage.project.LinkedClient.clientName
    except AttributeError:
        client_name = "unknown"

    # Sanitize the client name and filename
    service_name = client_name.replace(" ", "_").lower().replace("info", "")[:40]
    clean_filename = filename.replace(" ", "_").lower()[:40]

    return os.path.join(f'static/uploadedmedia/services/{service_name}/{field_name}', clean_filename)



def upload_to_image_link_logo(self, filename):
    return get_upload_path(self, filename, 'Logo')

def upload_to_image_link_hero(self, filename):
    return get_upload_path(self, filename, 'Hero')

def upload_to_image_link_projectImage(self, filename):
    return get_upload_path(self, filename, 'ProjectImage')

def upload_to_video_link(self, filename):
    return get_upload_path(self, filename, 'video') 


class Project(models.Model):
    ''' 
    A table that contains all project level information like 
    data started, date ended, client its for and deposit paid and cost
    project name too
    '''
    projectName = models.CharField(max_length=300, null=True, blank=True)
    projectLogoURL = models.ImageField(upload_to=upload_to_image_link_logo, height_field=None, 
                                        width_field=None, max_length=150, blank=True)
    projectHeroURL = models.ImageField(upload_to=upload_to_image_link_hero, height_field=None, 
                                        width_field=None, max_length=150, blank=True)
    projectLongDescription = models.CharField(max_length=3000, null=True, blank=True)
    projectShortDescription = models.CharField(max_length=500, null=True, blank=True)
    marketing = models.BooleanField(default=False)
    website = models.BooleanField(default=False)
    active = models.BooleanField(default=True)
    colorOne = models.CharField(max_length=200, null=True, blank=True)
    colorModifierOne = models.CharField(max_length=200, null=True, blank=True)
    colorTwo = models.CharField(max_length=200, null=True, blank=True)
    colorModifierTwo = models.CharField(max_length=200, null=True, blank=True)
    colorThree = models.CharField(max_length=200, null=True, blank=True)
    colorModifierThree = models.CharField(max_length=200, null=True, blank=True)
    colorFour = models.CharField(max_length=200, null=True, blank=True)
    colorModifierFour = models.CharField(max_length=200, null=True, blank=True)
    colorFive = models.CharField(max_length=200, null=True, blank=True)
    colorModifierFive = models.CharField(max_length=200, null=True, blank=True)
    # border colour one
    backgroundColor = models.CharField(max_length=100, default="black", blank=False)
    backgroundColorModifier = models.CharField(max_length=100, null=True, blank=True)
    # border colour two
    backgroundColor = models.CharField(max_length=100, default="black", blank=False)
    backgroundColorModifier = models.CharField(max_length=100, null=True, blank=True)
    # background
    backgroundColor = models.CharField(max_length=100, default="black", blank=False)
    backgroundColorModifier = models.CharField(max_length=100, null=True, blank=True)
    # all other text
    textColor = models.CharField(max_length=100, default="white-text", blank=False)
    textColorModifier = models.CharField(max_length=100, null=True, blank=True)
    # title text
    titleColor = models.CharField(max_length=100, default="white-text", blank=False)
    titleTextColorModifier = models.CharField(max_length=100, null=True, blank=True)
    # title bg
    titleBackgroundColor = models.CharField(max_length=100, default="black", blank=False)
    titleBackgroundColorModifier = models.CharField(max_length=100, null=True, blank=True)
    # linked entities
    LinkedClient = models.ForeignKey(ClientsAndGroups, on_delete=models.SET_NULL, null=True, blank=True)
    LinkedRequest = models.ForeignKey(RequestTickets, on_delete=models.SET_NULL, null=True, blank=True)
    LinkedUser = models.ForeignKey(UserProfile, on_delete=models.SET_NULL, null=True, blank=True)
    def __str__(self):
        return f'{self.LinkedClient.clientName if self.LinkedClient else "No Client"} - {self.projectName or "Unnamed Project"}'


class ProjectPage(models.Model):
    """A Table that contains the structure of the projectPage"""
    project = models.ForeignKey(Project, on_delete=models.CASCADE, blank=False)

    def __str__(self):
        return f"{self.project.projectName or 'Unnamed Project'} Page"


class UploadedMedia(models.Model):
    """ 
    This is a table that contains the media for the project pages
    """
    project = models.ForeignKey(Project, on_delete=models.CASCADE, blank=False)
    fileName = models.CharField(max_length=300, null=True, blank=True)
    imageURL = models.ImageField(upload_to=upload_to_image_link_projectImage, height_field=None, 
                                        width_field=None, max_length=170, blank=True)
    videoURL = models.FileField(upload_to=upload_to_video_link, max_length=150, blank=True)
    dateUploaded = models.DateTimeField(default=timezone.now)
    backgroundColor = models.CharField(max_length=100, default="black", blank=False)
    backgroundColorModifier = models.CharField(max_length=100, null=True, blank=True)
    textColor = models.CharField(max_length=100, default="white-text", blank=False)
    textColorModifier = models.CharField(max_length=100, null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.fileName and self.imageURL:
            self.fileName = self.imageURL.name
        elif not self.fileName and self.videoURL:
            self.fileName = self.videoURL.name
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.fileName or 'Unnamed File'} - {self.dateUploaded.strftime('%Y-%m-%d')}"


class Tag(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class UploadedMediaMetaData(models.Model):
    uploadedMediaLink = models.ForeignKey(UploadedMedia, on_delete=models.CASCADE, blank=False)
    fileName = models.CharField(max_length=300, null=True, blank=True)
    dateTaken = models.DateTimeField(blank=True, null=True)
    location = models.CharField(max_length=300, null=True, blank=True)
    tags = models.ManyToManyField(Tag, blank=True)

    def __str__(self):
        return self.fileName or self.uploadedMediaLink.fileName


class ProjectPageSections(models.Model):
    projectPage = models.ForeignKey(ProjectPage, on_delete=models.CASCADE, blank=False, null=False)
    sectionTitle = models.CharField(max_length=300, null=True, blank=True)
    sectionType = models.CharField(max_length=300, null=True, blank=True)
    uploadedMedia = models.ManyToManyField(UploadedMedia, blank=False)
    shortDescription = models.CharField(max_length=500, null=True, blank=True)
    longDescription = models.CharField(max_length=3000, null=True, blank=True)
    order = models.IntegerField(null=False, blank=False)
    display = models.BooleanField(default=True)
    # border colour one
    backgroundColor = models.CharField(max_length=100, default="black", blank=False)
    backgroundColorModifier = models.CharField(max_length=100, null=True, blank=True)
    # border colour two
    borderBackgroundColor = models.CharField(max_length=100, default="black", blank=False)
    borderBackgroundColorModifier = models.CharField(max_length=100, null=True, blank=True)
    # background
    backgroundColor = models.CharField(max_length=100, default="black", blank=False)
    backgroundColorModifier = models.CharField(max_length=100, null=True, blank=True)
    # all other text
    textColor = models.CharField(max_length=100, default="white-text", blank=False)
    textColorModifier = models.CharField(max_length=100, null=True, blank=True)
    # title text
    titleColor = models.CharField(max_length=100, default="white-text", blank=False)
    titleTextColorModifier = models.CharField(max_length=100, null=True, blank=True)
    # title bg
    titleBackgroundColor = models.CharField(max_length=100, default="black", blank=False)
    titleBackgroundColorModifier = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.sectionTitle


class SectionComments(models.Model):
    section = models.ForeignKey(ProjectPageSections, on_delete=models.CASCADE, related_name='comments')
    username = models.CharField(max_length=150)
    content = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)

    parent = models.ForeignKey(
        'self',
        null=True,
        blank=True,
        related_name='replies',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f'{self.username}: {self.content[:30]}{"..." if len(self.content) > 30 else ""}'

    class Meta:
        ordering = ['created_at']

# Copilot media models 

# Copilot website models