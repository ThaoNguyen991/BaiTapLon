from django.urls import path, re_path, include
from . import views

urlpatterns = [
    path('house/', views.index, name="index"),
    path('house/<int:house_id>', views.list, name="list"),
    path('category/', views.CategoryView.as_view())
]