from django.urls import path, include
from . import views

urlpatterns = [
    path('api/', include("auth_api.urls")),
    path('', views.index),
]
