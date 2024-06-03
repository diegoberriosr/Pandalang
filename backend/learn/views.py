from django.db import IntegrityError
from django.http import JsonResponse, HttpResponse, Http404, HttpResponseForbidden
from django.db.models import Sum
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import User, Language, Course, Lesson, Session, Translation

import json
from random import shuffle, sample
from .utils import assign_exercise_type, get_last_sunday, get_next_sunday
from math import ceil

# Create your views here.

def index(request):
    return HttpResponse('Hi!')


@api_view(['POST'])
def register_user(request):

    # Get email, username, and password from request's body.
    email = json.loads(request.body).get('email', '')
    username = json.loads(request.body).get('username', '')
    password = json.loads(request.body).get('password')

    try: # Attempt to create user
        User.objects.create_user(email=email, username=username, password=password)
        return JsonResponse({ 'message' : 'user was successfully created'}, status=201)
    except IntegrityError: # Id not possible, raise an exception
        raise Http404('Username or email already exists')
    except Exception as e:
        raise Http404(e)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile_information(request):
    
    # Get requester basic data (hearts, available xp, active course, courses enrolled in)
    user = request.user
    last_completed_lesson = Lesson.objects.filter(section__course=request.user.active_course).filter(completed_by=request.user).order_by("-number_in_course").first()
    current_lesson = 1

    if last_completed_lesson:
        current_lesson = last_completed_lesson.number_in_course + 1

    user_data = user.serialize(request, current_lesson)

    return JsonResponse(user_data, safe=False)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_available_courses(request):

    # A filter for getting courses taught in an specific language (not required).
    filter_param = request.GET.get('filter', '')

    # Remove the courses where the user was already enrolled in.
    enrolled_course_ids = request.user.enrolled_courses.values_list('id', flat=True)
    courses = Course.objects.exclude(id__in=enrolled_course_ids)

    # If a filter was indeed provided, return all courses which origin_language matches the filter.
    if filter_param:
        try:
            language = Language.objects.get(name__icontains=filter_param)
            courses = courses.filter(origin_language=language)
        except Language.DoesNotExist:
            raise Http404('ERROR : language not found')
        
    # Serialize available courses
    course_data = [course.card_serialize(request) for course in courses]

    return JsonResponse(course_data, safe = False)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def enroll_in_course(request):

    # Get course id from the request's body.
    course_id = json.loads(request.body).get('course_id')

    # Search the course in the database, raise an exception if it does not exist.
    try:
        course = Course.objects.get(id=course_id)
    except Course.DoesNotExist:
        return Http404(f'ERROR : course with id={course_id} does not exist')

    # Un-enroll the user if already enrolled
    if course in request.user.enrolled_courses.all():
        course.enrolled_users.remove(request.user)
        return JsonResponse({ 'message' : 'Success'}, status=200) 
    
    # Otherwise enroll user and set the course as active
    course.enrolled_users.add(request.user)
    request.user.active_course = course
    request.user.save()

    return JsonResponse(  {
        'active' : course.serialize(request.user, 0, request),
        'profile' : course.profile_serialize(request)
        }, safe=False)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def change_active_course(request):

    # Get course id from the request's body
    course_id = json.loads(request.body).get('course_id')

    # Search the course in the database, raise an exception if it does not exist.
    try:
        course = Course.objects.get(id=course_id)
    except Course.DoesNotExist:
        raise Http404(f'ERROR : course with id={course_id} does not exist')
    
    # Change active course
    request.user.active_course = course
    request.user.save()

    # Get the last lesson completed by the requester inside the course
    last_completed_lesson = Lesson.objects.filter(section__course=request.user.active_course).filter(completed_by=request.user).order_by('-number_in_course').first()
    highest_number_in_course = 0

    if last_completed_lesson:
        highest_number_in_course = last_completed_lesson.number_in_course

    return JsonResponse( course.serialize(request.user, highest_number_in_course + 1, request), safe=False)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_lesson(request, lesson_id):

    # Search the lesson in the database, raise an exception if it does not exist.
    try:
        lesson = Lesson.objects.get(id=lesson_id)
    except Lesson.DoesNotExist:
        raise Http404(f'ERROR : lesson with id={lesson_id} does not exist')
    
    # Check that user is enrolled in the associated course and also has it as active.
    if lesson.section.course not in request.user.enrolled_courses.all() or lesson.section.course != request.user.active_course:
        return HttpResponseForbidden('ERROR: user is not enrolled in this course or does not have this course as active')
    
    # Get all the translations associated with the lesson
    if lesson.type != 'final':
        translations = lesson.translations.all()
    else:
        translations = sample(list(Translation.objects.filter(lesson_section=lesson.section).all()), 5) # If lesson is a final review, get 5 translations associated with the review lesson's section

    exercises = []

    # Randomly add an an exercise type an a set of options to each translation
    translations = assign_exercise_type(list(translations) * 4)

    # Serialize data.
    for translation in translations:
        answer = translation.target
        equivalent = translation.origin.word
        words = sample([pair.target.serialize(translation=pair.origin.word) for pair in translations if pair.target != answer], 3) + [answer.serialize(translation=equivalent)]

        if translation.type == 'with_help_origin' or translation.type == 'without_help_origin':
            answer = translation.origin
            equivalent = translation.target.word
            words = sample([pair.origin.serialize(translation=pair.target.word) for pair in translations if pair.origin != answer], 3) + [answer.serialize(translation=equivalent)]


        shuffle(words)

        exercises.append({
            'answer' : answer.serialize(translation=equivalent),
            'words' : words,
            'type' : translation.type
        })


    # Randomize order of exercises.
    shuffle(exercises)

    return JsonResponse(exercises, safe=False)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_practice_lesson(request, course_id):

    try:
        course = Course.objects.get(id=course_id)
    except Course.DoesNotExist:
        raise Http404(f'ERROR: course with id={course_id} does not exist')

    if course not in request.user.enrolled_courses.all() or request.user.active_course != course:
        return HttpResponseForbidden('ERROR: user is not enrolled in this course or does not have this course as active')

    # Get translations for practice lesson.
    translations = request.user.seen_translations.filter(lesson__section__course__id=course_id)

    if translations.count() < 4:
        return HttpResponseForbidden('ERROR : requester cannot take practice lessons since they do not know enough words.')

    translations = sample(list(translations), 4) # Get 4 random seen translations.
        
    # Randomly add an an exercise type an a set of options to each translation
    translations = assign_exercise_type(list(translations) * 4)

    exercises =[]

    # Serialize data.
    for translation in translations:
        answer = translation.target
        equivalent = translation.origin.word
        words = sample([pair.target.serialize(translation=pair.origin.word) for pair in translations if pair.target != answer], 3) + [answer.serialize(translation=equivalent)]

    if translation.type == 'with_help_origin' or translation.type == 'without_help_origin':
        answer = translation.origin
        equivalent = translation.target.word
        words = sample([pair.origin.serialize(translation=pair.target.word) for pair in translations if pair.origin != answer], 3) + [answer.serialize(translation=equivalent)]

    shuffle(words)

    exercises.append({
        'answer' : answer.serialize(translation=equivalent),
        'words' : words,
        'type' : translation.type
     })


    # Randomize order of exercises.
    shuffle(exercises)


    return JsonResponse(exercises, safe=False)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def complete_lesson(request, lesson_id):
    
    # Get lesson id and accuracy from the request's body.
    accuracy = json.loads(request.body).get('accuracy')
    practice = json.loads(request.body).get('practice')

    # Check if a practice lesson was completed
    if practice.lower() == 'true':
        xp = accuracy * 5
        request.user.update_xp(xp) # Practice lessons have a base xp of 5 points.
        
        if request.user.hearts < 5: # Refill 1 heart for completing a practice lesson (only if applicable).
            request.user.update_hearts(1)
        
        return JsonResponse({
            'xp' : xp,
            'completed' : False
        }, safe=False)

    # Search lesson by id, raise an exception if it does not exist.
    try:
        lesson = Lesson.objects.get(id=lesson_id)
    except Lesson.DoesNotExist:
        raise Http404(f'ERROR: lesson with id={lesson_id} does not exist')
    
    # Make sure that user is enrolled in a course and has it as active.
    if lesson.section.course not in request.user.enrolled_courses.all() or lesson.section.course != request.user.active_course:
        return HttpResponseForbidden('ERROR: user is not enrolled in this course or does not have this course as active')
    
    # Make a new session entry in the database.
    new_session = Session(user=request.user, lesson=lesson, earned_xp=ceil(accuracy*lesson.granted_xp))
    new_session.save()

    # Update user xp
    request.user.update_xp(new_session.earned_xp)

    # If the number of sessions associated with the lesson and the user exceeds the number of cycles of the session, mark the lesson as completed by the user.
    if Session.objects.filter(lesson=lesson).filter(user=request.user).count() >= lesson.cycles and request.user not in lesson.completed_by.all():
        lesson.completed_by.add(request.user)
        lesson.save()

    # Mark all translations associated with the lesson as seen
    for translation in lesson.translations.all():
        translation.seen_by.add(request.user) if request.user not in translation.seen_by.all() else None

    last_completed_lesson = Lesson.objects.filter(section__course=request.user.active_course).filter(completed_by=request.user).order_by("-number_in_course").first()

    return JsonResponse({
        'xp' : new_session.earned_xp,
        'completed' : request.user in lesson.completed_by.all() and lesson == last_completed_lesson
        }, safe=False)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_hearts(request):

    # Get amount from the request's body.
    amount = json.loads(request.body).get('amount')

    # Update user hearts.
    request.user.update_hearts(amount)

    return JsonResponse({
        'hearts' : request.user.hearts
    })


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def refill_hearts(request):

    # Get hearts amount and xp_cost
    hearts_amount = json.loads(request.body).get('hearts_amount')
    xp_cost = json.loads(request.body).get('xp_cost')

    # Update hearts and available xp attributes
    request.user.consume_available_xp(xp_cost)
    request.user.update_hearts(hearts_amount)

    return JsonResponse({
        'hearts' : request.user.hearts,
        'available_xp' : request.user.available_xp
    })


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_membership(request):

    request.user.update_membership_status()

    return JsonResponse({ 'message' : 'Membership was successfully updated.'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_leaderboard_scores(request):
    filter = request.GET.get('filter')

    # Check if requesting for a global ranking of users
    if filter == 'global':
        profiles = User.objects.all().order_by('-xp')[:10] # Get the top 10 global users by amount of xp

        # Serialize profiles
        profile_data = [profile.leaderboard_serialize() for profile in profiles]

        return JsonResponse(profile_data, safe=False)
    
    # Otherwise, get the current week's top 10 users by earned xp
    last_sunday = get_last_sunday()
    next_sunday = get_next_sunday()
    profiles = Session.objects.filter(timestamp__range=(last_sunday, next_sunday)).values('user').annotate(total_xp=Sum('earned_xp'))[:10]
    
    profile_data = [profile.leaderboard_serialize(profile.total_xp) for profile in profiles]

    return JsonResponse(profile_data, safe=False)