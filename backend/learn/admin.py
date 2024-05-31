from django.contrib import admin
from .models import Flag, Language, User, Course, Section, Lesson, Word, Translation, Session

# Register your models here.
admin.site.register(User)
admin.site.register(Flag)
admin.site.register(Language)
admin.site.register(Course)
admin.site.register(Section)
admin.site.register(Lesson)
admin.site.register(Word)
admin.site.register(Translation)
admin.site.register(Session)
