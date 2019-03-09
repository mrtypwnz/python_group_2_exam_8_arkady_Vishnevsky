from django.db import models


class Task(models.Model):
    TASK_STATUS_CHOICES = [
        ('todo', 'ToDo'),
        ('progress', 'Progress'),
        ('done', 'Done')
    ]

    summary = models.CharField(max_length=255)
    description = models.TextField(max_length=1000, blank=True, null=True)
    due_date = models.DateTimeField()
    status = models.CharField(max_length=50, choices=TASK_STATUS_CHOICES, default='todo')
    time_planned = models.DecimalField(max_digits=8, decimal_places=1, null=True, blank=True)

    def __str__(self):
        return '%s, %s' % (self.summary, self.status)