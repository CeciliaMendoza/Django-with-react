from rest_framework import viewsets          
from  django_filters.rest_framework import DjangoFilterBackend

from .serializers import TodoSerializer      
from .models import Todo                     
        
class TodoView(viewsets.ModelViewSet):       
  serializer_class = TodoSerializer          
  queryset = Todo.objects.all()              
  filter_backends = [DjangoFilterBackend]
  filterset_fields =['category','relevant', 'completed', 'color']