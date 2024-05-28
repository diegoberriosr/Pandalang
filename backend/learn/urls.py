from django.urls import path
from . import views
from .serializers import MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView
)

urlpatterns = [
    path('', views.index, name='index'),
    path('register', views.register_user, name='register_user'),
    path('token/', MyTokenObtainPairView.as_view(), name='obtain_token_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('courses', views.get_available_courses, name='get_available_courses'),
    path('enroll', views.enroll_in_course, name='enroll_in_course'),
    path('change', views.change_active_course, name='change_active_course'),   
    path('lesson/<int:lesson_id>', views.get_lesson, name='get_lesson'),
    path('practice/<int:course_id>', views.get_practice_lesson, name='get_practice_lesson'),
    path('lesson/complete/<int:lesson_id>', views.complete_lesson, name='complete_lesson'),
]