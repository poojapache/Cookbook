from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser, Recipe, Chef

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'username', 'password']
        
    def create(self, validated_data):
        print("In here")
        user = CustomUser(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password'],
        )
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")
        print(email)
        print(password)
        
        if email and password:
            user = CustomUser.objects.filter(email=email, password=password)
            if not user:
                raise serializers.ValidationError("Invalid email or password")
        else:
            raise serializers.ValidationError("Must include email and password")
        
        data['user'] = user
        print(data['user'])
        return data
    
class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = '__all__'

class ChefSerializer(serializers.ModelSerializer):
    recipes = RecipeSerializer(many=True, read_only=True)
    class Meta:
        model = Chef
        fields = '__all__'

        