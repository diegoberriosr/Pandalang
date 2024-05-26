from django.contrib import admin
from .models import Flag, Language, User

# Register your models here.
admin.site.register(User)
admin.site.register(Flag)
admin.site.register(Language)
