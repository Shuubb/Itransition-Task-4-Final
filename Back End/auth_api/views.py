import base64
from django.http import HttpRequest
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from .userSerializer import UserSerializer
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User


@api_view(['POST'])
@permission_classes([AllowAny])
def registration_endpoint(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(password=make_password(request.data.get('password')))
        return Response(status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_endpoint(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)

    if user is not None:
        base64_credentials = base64.b64encode(f"{username}:{password}".encode('utf-8'))
        return Response({ "authToken": base64_credentials, "userName": user.get_username() }, status=status.HTTP_200_OK)
    return Response({"message": "Invalid Credentials!"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_list(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def user_delete(request, user_id):
    try:
        user = User.objects.get(pk=user_id)
        user.delete()
        return Response({'message': 'User deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    except User.DoesNotExist:
        return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def user_block_switch(request, user_id):
    try:
        user = User.objects.get(pk=user_id)
        blocked = request.data.get('blocked')
        print(blocked)
        user.is_active = not blocked
        user.save()
        return Response({'message': 'User status updated successfully'}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    


