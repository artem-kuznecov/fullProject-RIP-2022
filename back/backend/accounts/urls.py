from django.urls import path
from .views import SignupView, GetCSRFToken, CheckAuthenticated, LoginView, LogoutView, DeleteAccountView, GetUsersView, CreateStaffView, GetUserInfoByID

urlpatterns = [
    path('authenticated', CheckAuthenticated.as_view()),
    path('register', SignupView.as_view()),
    path('register_staff', CreateStaffView.as_view()),
    path('login', LoginView.as_view()),
    path('logout', LogoutView.as_view()),
    path('delete', DeleteAccountView.as_view()),
    path('csrf_cookie', GetCSRFToken.as_view()),
    path('get_users', GetUsersView.as_view()),
    path('user_info_by_id/<int:pk>', GetUserInfoByID.as_view()),
]