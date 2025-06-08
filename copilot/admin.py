from django.contrib import admin
from .models import (
    Project,
    ProjectPage,
    ProjectPageSections,
    UploadedMedia,
    UploadedMediaMetaData,
    Tag,
    SectionComments
)

admin.site.register(Project)
admin.site.register(ProjectPage)
admin.site.register(ProjectPageSections)
admin.site.register(UploadedMedia)
admin.site.register(UploadedMediaMetaData)
admin.site.register(Tag)
admin.site.register(SectionComments)