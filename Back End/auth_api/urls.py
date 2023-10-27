from . import views
from django.urls import path

urlpatterns = [
    path('register/', views.registration_endpoint, name='registration'),
    path('login/', views.login_endpoint, name='login'),
    path('userlist/', views.user_list, name='user-list'),
    path('user/delete/<int:user_id>/', views.user_delete, name='user-delete'),
    path('user/blockswitch/<int:user_id>/', views.user_block_switch, name='user-block-switch'),
]
