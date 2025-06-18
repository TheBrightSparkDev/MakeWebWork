from django.shortcuts import get_object_or_404, render, redirect
from django.utils import timezone
from django.template.loader import render_to_string
from django.http import JsonResponse, HttpResponse, HttpResponseBadRequest
from .models import Project, ProjectPage, ProjectPageSections, SectionComments, UploadedMedia
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from django.views.decorators.http import require_POST
from django.urls import reverse
from django.contrib import messages
from .forms import ProjectForm
from .models import Project


def createProject(request):
    if request.method == 'POST':
        form = ProjectForm(request.POST, request.FILES)
        if form.is_valid():
            project = form.save(commit=False)
            project.save()

            # Add current user's profile to linkedUsers if they have one
            if hasattr(request.user, 'profile'):
                project.linkedUsers.add(request.user.profile)

            return redirect('copilot-home')  # Change this to your actual home view name
    else:
        form = ProjectForm()

    return render(request, 'copilot/createProject.html', {
        'form': form
    })


def marketingCopilot(request, projectName):
    project = get_object_or_404(Project, projectName=projectName)

    sections = ProjectPageSections.objects.filter(
        projectPage__project=project,
        display=True
    ).prefetch_related(
    'uploadedMedia',
    'comments__replies',
    'uploadedMedia__uploadedmediametadata_set__tags'
    ).order_by('order').distinct()

    # Handle comment submission
    if request.method == 'POST' and request.POST.get('submit_type') == 'comment':
        section_id = request.POST.get('section_id')
        username = request.POST.get('username', '').strip()
        content = request.POST.get('content', '').strip()
        parent_id = request.POST.get('parent_id')

        if not (section_id and username and content):
            return HttpResponseBadRequest("Missing required fields.")

        try:
            section = ProjectPageSections.objects.get(id=section_id)
            comment = SectionComments(
                section=section,
                username=username,
                content=content,
                created_at=timezone.now()
            )

            if parent_id:
                try:
                    comment.parent = SectionComments.objects.get(id=parent_id)
                except SectionComments.DoesNotExist:
                    pass

            comment.save()

            if request.headers.get('x-requested-with') == 'XMLHttpRequest':
                html = render_to_string('copilot/includes/comments.html', {
                    'section': section
                }, request=request)
                return HttpResponse(html)

            return redirect('marketing-copilot', projectName=projectName)

        except ProjectPageSections.DoesNotExist:
            return HttpResponseBadRequest("Section not found.")

    return render(request, 'copilot/MarketingTemplate.html', {
        'project': project,
        'sections': sections,
    })



def webCopilot(request, projectName):
    project = get_object_or_404(Project, projectName=projectName)

    sections = ProjectPageSections.objects.filter(
        projectPage__project=project,
        display=True
    ).prefetch_related(
        'uploadedMedia',
        'comments__replies',
        'uploadedMedia__uploadedmediametadata_set__tags'
    ).order_by('order').distinct()

    if request.method == 'POST' and request.POST.get('submit_type') == 'comment':
        section_id = request.POST.get('section_id')
        content = request.POST.get('content', '').strip()
        parent_id = request.POST.get('parent_id')

        # Use logged-in user if available
        if request.user.is_authenticated:
            username = request.user.get_full_name() or request.user.username
        else:
            username = request.POST.get('username', '').strip()

        # Basic validation
        if not (section_id and username and content):
            return HttpResponseBadRequest("Missing required fields.")

        try:
            section = ProjectPageSections.objects.get(id=section_id)
            comment = SectionComments(
                section=section,
                username=username,
                content=content,
                created_at=timezone.now()
            )

            if parent_id:
                try:
                    comment.parent = SectionComments.objects.get(id=parent_id)
                except SectionComments.DoesNotExist:
                    pass

            comment.save()

            if request.headers.get('x-requested-with') == 'XMLHttpRequest':
                html = render_to_string('copilot/includes/innerComments.html', {
                    'section': section,
                    'project': section.projectPage.project  # ✅ Now included for template use
                }, request=request)
                return HttpResponse(html)

            return redirect('web-copilot', projectName=projectName)

        except ProjectPageSections.DoesNotExist:
            return HttpResponseBadRequest("Section not found.")

    return render(request, 'copilot/WebTemplate.html', {
        'project': project,
        'sections': sections,
    })



def copilotHome(request):
    user = request.user

    if user.is_superuser:
        projects = Project.objects.filter(active=True)
    else:
        try:
            profile = user.profile
            projects = Project.objects.filter(active=True, linkedUsers=profile)
        except UserProfile.DoesNotExist:
            projects = Project.objects.none()  # No profile found = no projects

    marketing_projects = projects.filter(marketing=True)
    website_projects = projects.filter(website=True)

    return render(request, 'copilot/CopilotHome.html', {
        'marketing_projects': marketing_projects,
        'website_projects': website_projects
    })


@csrf_protect
@require_POST
def upload_media(request):
    media_file = request.FILES.get('media')
    project_id = request.POST.get('projectId')

    if not media_file:
        return JsonResponse({'status': 'error', 'message': 'No media file provided'}, status=400)

    if not project_id or not project_id.isdigit():
        return JsonResponse({'status': 'error', 'message': 'Invalid projectId'}, status=400)

    try:
        project = Project.objects.get(id=int(project_id))
        new_media = UploadedMedia.objects.create(
            project=project,
            fileName=request.POST.get('fileName') or media_file.name,
            imageURL=media_file if media_file.content_type.startswith("image") else None,
            videoURL=media_file if media_file.content_type.startswith("video") else None,
            dateUploaded=timezone.now()
        )
        return JsonResponse({'status': 'success', 'mediaId': new_media.id})
    except Project.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Project not found'}, status=400)



@csrf_protect
@require_POST
def cycleMediaClasses(request):
    try:
        media_id = request.POST.get('mediaId')
        project_id = request.POST.get('projectId')
        is_text = request.POST.get('isText') == 'true'

        if not media_id or not project_id:
            return JsonResponse({'status': 'error', 'message': 'Missing mediaId or projectId'}, status=400)

        media = UploadedMedia.objects.get(id=media_id)
        project = Project.objects.get(id=project_id)

        cycle_order = [
            ("colorOne", "colorModifierOne"),
            ("colorTwo", "colorModifierTwo"),
            ("colorThree", "colorModifierThree"),
            ("colorFour", "colorModifierFour"),
            ("colorFive", "colorModifierFive"),
        ]

        def get_index(current, color_classes):
            try:
                return color_classes.index(current)
            except ValueError:
                return -1

        color_classes = [(getattr(project, c), getattr(project, m)) for c, m in cycle_order]

        if is_text:
            current = ((media.textColor or '').removesuffix('-text'), media.textColorModifier or '')
            index = get_index(current, color_classes)
            next_color, next_mod = color_classes[(index + 1) % len(color_classes)]
            media.textColor = f"{next_color}-text"
            media.textColorModifier = next_mod
        else:
            current = (media.backgroundColor or '', media.backgroundColorModifier or '')
            index = get_index(current, color_classes)
            next_color, next_mod = color_classes[(index + 1) % len(color_classes)]
            media.backgroundColor = next_color
            media.backgroundColorModifier = next_mod

        media.save()

        return JsonResponse({
            'status': 'success',
            'bgColorClass': media.backgroundColor,
            'bgModifierClass': media.backgroundColorModifier or '',
            'textColorClass': media.textColor,
            'textModifierClass': media.textColorModifier or ''
        })

    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def renameMedia(request):
    if request.method == 'POST':
        media_id = request.POST.get('mediaId')
        new_name = request.POST.get('newFileName')
        try:
            media = UploadedMedia.objects.get(id=media_id)
            media.fileName = new_name
            media.save()
            return JsonResponse({'status': 'success', 'newFileName': new_name})
        except UploadedMedia.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Media not found.'})
    return JsonResponse({'status': 'error', 'message': 'Invalid request.'})


@csrf_exempt
def delete_media(request):
    if request.method == 'POST':
        media_id = request.POST.get('mediaId')
        media = get_object_or_404(UploadedMedia, id=media_id)

        # Delete file from storage if needed
        if media.imageURL:
            media.imageURL.delete(save=False)
        if media.videoURL:
            media.videoURL.delete(save=False)

        media.delete()

        return JsonResponse({'status': 'success'})

    return JsonResponse({'status': 'error', 'message': 'Invalid request method.'})


def add_project_section(request, project_id):
    print("REACHED add_project_section VIEW")
    project = get_object_or_404(Project, id=project_id)

    if request.method == 'POST':
        print(request)
        title = request.POST.get('sectionTitle', '').strip()
        section_type = request.POST.get('sectionType', '').strip()
        media_ids = request.POST.getlist('mediaIds[]')
        short_desc = request.POST.get('shortDescription', '').strip()
        long_desc = request.POST.get('longDescription', '').strip()
        order = int(request.POST.get('order') or 1)
        display = request.POST.get('display') == 'on'

        # Only skip media requirement for specific section types
        media_optional_types = ['text', 'rebrand']  # Add more if needed

        if section_type not in media_optional_types and not media_ids:
            messages.error(request, f"{section_type.capitalize()} sections require at least one media item.")
            return redirect(request.META.get('HTTP_REFERER', '/'))

        # Ensure the related ProjectPage exists
        project_page, _ = ProjectPage.objects.get_or_create(project=project)

        # Create section
        section = ProjectPageSections.objects.create(
            projectPage=project_page,
            sectionTitle=title,
            sectionType=section_type,
            shortDescription=short_desc,
            longDescription=long_desc,
            order=order,
            display=display
        )

        # Attach uploaded media
        media_qs = UploadedMedia.objects.filter(id__in=media_ids)
        section.uploadedMedia.set(media_qs)

        messages.success(request, "Section added successfully!")
        return redirect('web-copilot', projectName=project.projectName)

    # Fallback for non-POST access
    media_options = UploadedMedia.objects.filter(project=project)
    return render(request, 'project/add_section.html', {
        'project': project,
        'media_options': media_options
    })



def load_editable_section(request):
    section_type = request.GET.get('type')
    project_id = request.GET.get('projectId')

    template_map = {
        "image": "copilot/partials/edit/sections/editableImageSection.html",
        "video": "copilot/partials/edit/sections/editableVideoSection.html",
        "business": "copilot/partials/edit/sections/editableBusinessCardSection.html",
        "text": "copilot/partials/edit/sections/editableTextSection.html",
        "rebrand": "copilot/partials/edit/sections/editableRebrandSection.html",
    }

    template_path = template_map.get(section_type)
    if not template_path:
        raise Http404("Section type not supported")

    try:
        project = Project.objects.get(pk=project_id)
    except Project.DoesNotExist:
        raise Http404("Project not found")

    return render(request, template_path, {
        "formAction": reverse('addProjectSection', args=[project.id]),
        "section": {},
        "uploadedMedia": project.uploadedmedia_set.all(),
        "project": project,
    })
