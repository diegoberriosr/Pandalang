from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
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
    path('me', views.get_profile_information, name='get_user_information'),
    path('courses', views.get_available_courses, name='get_available_courses'),
    path('enroll', views.enroll_in_course, name='enroll_in_course'),
    path('change', views.change_active_course, name='change_active_course'),   
    path('lesson/<int:lesson_id>', views.get_lesson, name='get_lesson'),
    path('practice/<int:course_id>', views.get_practice_lesson, name='get_practice_lesson'),
    path('lesson/complete/<int:lesson_id>', views.complete_lesson, name='complete_lesson'),
    path('hearts/update', views.update_hearts, name='update_hearts'),
    path('hearts/refill', views.refill_hearts, name='refill_hearts'),
    path('membership', views.update_membership, name='update_membership'),
    path('leaderboard', views.get_leaderboard_scores, name='get_leaderboard_scores')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)