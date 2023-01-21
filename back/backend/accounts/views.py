from django.contrib import auth
from django.contrib.auth.models import User
from django.utils.decorators import method_decorator
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect

from user_profile.models import UserProfile
from user_profile.serializers import UserProfileSerializer
from .serializers import UserSerializer


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        return Response({'success': 'CSRF cookie set'})


@method_decorator(csrf_protect, name='dispatch')
class CheckAuthenticated(APIView):
    def get(self, request, format=None):
        user = self.request.user
        staffCheck = User.objects.get(id=user.id).is_staff
        try:
            isAuthenticated = User.is_authenticated

            if isAuthenticated:
                return Response({'isAuthenticated': 'success', 'is_staff': staffCheck})
            else:
                return Response({'isAuthenticated': 'error', 'is_staff': staffCheck})
        except:
            return Response({'error': 'error checking authentication status'})


@method_decorator(csrf_protect, name='dispatch')
class SignupView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        username = data['username']
        password = data['password']
        re_password = data['re_password']

        if password == re_password:
            if User.objects.filter(username=username).exists():
                return Response({'error': 'username is already taken'})
            else:
                user = User.objects.create_user(username=username, password=password)

                user = User.objects.get(id=user.id)

                user_profile = UserProfile.objects.create(user=user, first_name='', last_name='', phone='', email='')

                return Response({'success': 'user created successfully'})
        else:
            return Response({'error': 'password do not match'})


@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data

        username = data['username']
        password = data['password']
        try:
            user = auth.authenticate(username=username, password=password)

            if user is not None:
                auth.login(request, user)
                return Response({'success': 'user authenticated'})
            else:
                return Response({'error': 'error authenticating'})
        except:
            return Response({'error': 'error logging in'})


class LogoutView(APIView):
    def post(self, request, format=None):
        try:
            auth.logout(request)
            return Response({'success': 'logged out'})
        except:
            return Response({'error': 'error logging out'})


class DeleteAccountView(APIView):
    def delete(self, request, format=None):
        user = self.request.user

        try:
            User.objects.filter(id=user.id).delete()

            return Response({'success': 'user deleted successfully'})
        except:
            return Response({'error': 'error deleting account'})


class GetUsersView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        users = User.objects.all()

        users = UserSerializer(users, many=True)

        return Response(users.data)


@method_decorator(csrf_protect, name='dispatch')
class CreateStaffView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        is_staff="true"
        secret_key = data['secret_key']
        username = data['username']
        password = data['password']
        re_password = data['re_password']

        if secret_key == "secret":
            if password == re_password:
                if User.objects.filter(username=username).exists():
                    return Response({'error': 'username is already taken'})
                else:
                    user = User.objects.create_user(username=username, password=password, is_staff=True)

                    user = User.objects.get(id=user.id)

                    user_profile = UserProfile.objects.create(user=user, first_name='', last_name='', phone='', email='')

                    return Response({'success': 'user created successfully'})
            else:
                return Response({'error': 'password do not match'})
        else:
            return Response({'error': 'secret key is incorrect'})


class GetUserInfoByID(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request, pk):
        user = self.request.user
        staff = user.is_staff

        helper = User.objects.get(id=pk).id
        nickname = User.objects.get(id=pk).username
        helper_two = UserProfile.objects.get(user_id=helper)

        helper_two = UserProfileSerializer(helper_two)

        return Response({'info': helper_two.data, 'username': nickname})
