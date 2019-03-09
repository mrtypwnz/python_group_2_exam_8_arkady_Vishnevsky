from webapp.models import Task
from rest_framework import viewsets
from rest_framework.response import Response
from api_v1.serializers import TaskSerializer

class NoAuthModelViewSet(viewsets.ModelViewSet):
    authentication_classes = []

class TaskViewSet(NoAuthModelViewSet):
    queryset = Task.objects.all().order_by('-due_date', 'status')
    serializer_class = TaskSerializer

def get_paginated_response(self, data):
    return Response(data)
