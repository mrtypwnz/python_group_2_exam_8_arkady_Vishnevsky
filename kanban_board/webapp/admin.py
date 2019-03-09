from django.contrib import admin
from webapp.models import Task

# Register your models here.
class TaskAdmin(admin.ModelAdmin):
    list_display = ['pk', 'name', 'release_date']
    ordering = ['-release_date']
    search_fields = ['name', 'id']

admin.site.register(Task)
