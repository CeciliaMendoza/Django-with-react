from django.db import models

category_options = (
    ("Personal", "Personal"),
    ("Escuela", "Escuela"),
    ("Trabajo", "Trabajo"),
)

relevance_options = (
    ("Baja" , "Baja"),
    ("Media", "Media"),
    ("Alta", "Alta"),
)

color_options = (
    ("#ffffff", "Blanco"), 
    ("#CED3F2", "Morado"), 
    ("#D0F2E9", "Verde"),
    ("#F2E8C9", "Amarillo"),
    ("#F2CECE", "Rosa"), 
    ("#dee2e6", "Gris")
)

class Todo(models.Model):
  title = models.CharField(max_length=120)
  description = models.TextField()
  completed = models.BooleanField(default=False)
  category = models.CharField(max_length=50, choices=category_options, default="Personal")
  relevant = models.CharField(max_length=10, choices=relevance_options, default="Baja")
  color = models.CharField(max_length=10, choices=color_options, default="Blanco")
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.title