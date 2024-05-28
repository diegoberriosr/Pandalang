from django.db import IntegrityError
from django.http import JsonResponse, HttpResponse, Http404, HttpResponseForbidden
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import User, Language, Course, Lesson

import json
from random import shuffle, sample
from .utils import assign_exercise_type

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
    course_data = [course.card_serialize() for course in courses]

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

    # Get the last lesson completed by the requester inside the course
    last_completed_lesson = Lesson.objects.filter(section__in=course.sections.all()).filter(completed_by__in=request.user.completed_lessons).order_by('-number_in_course').first() 

    return JsonResponse( course.serialize(request.user, last_completed_lesson + 1), safe=False)


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
    last_completed_lesson = Lesson.objects.filter(section__in=course.sections.all()).filter(completed_by__in=request.user.completed_lessons).order_by('-number_in_course').first() 

    return JsonResponse( course.serialize(request.user, last_completed_lesson + 1), safe=False)


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
        raise HttpResponseForbidden('ERROR: user is not enrolled in this course or does not have this course as active')
    
    # Number of exercises is equal to the number 
    # of exercises associated with the lesson * 4.
    exercises = Lesson.translations.all() * 4

    # Randomly add a type to each exercise
    exercises = assign_exercise_type(exercises)
    
    # Randomize order of exercises.
    shuffle(exercises)

    # Serialize data.
    exercise_data = [exercise.serialize() for exercise in exercises]

    return JsonResponse(exercise_data, safe=False)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_practice_lesson(request, course_id):

    try:
        course = Course.objects.get(id=course_id)
    except Course.DoesNotExist:
        raise Http404(f'ERROR: course with id={course_id} does not exist')

    if course not in request.user.enrolled_courses.all() or request.user.active_course != course:
        raise HttpResponseForbidden('ERROR: user is not enrolled in this course or does not have this course as active')

    # Get translations for practice lesson
    exercises = sample(request.user.seen_translations.filter(lesson__section__course__id=course_id), 4) # Get 4 random seen translations.

    # Assign a random type to each exercise
    exercises = assign_exercise_type(exercises)

    # Serialize data
    exercise_data = [exercise.serialize() for exercise in exercises]
    
    return JsonResponse(exercise_data, safe=False)

