from django.contrib import admin
from .models import CustomUser, Recipe, Chef, Cookbook

admin.site.register(CustomUser)
admin.site.register(Recipe)
admin.site.register(Chef)
admin.site.register(Cookbook)