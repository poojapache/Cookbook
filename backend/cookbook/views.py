from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import LoginSerializer
from .models import CustomUser, Recipe, Cookbook, Chef
from .serializers import CustomUserSerializer, RecipeSerializer, ChefSerializer
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from rest_framework.decorators import api_view

class CustomUserCreateView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        return Response({"email": user[0].email, "username": user[0].username}, status=status.HTTP_200_OK)
    
class RecipeListView(APIView):
    def get(self, request, *args, **kwargs):
        recipes = Recipe.objects.all()
        serializer = RecipeSerializer(recipes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class ChefListView(APIView):
    def get(self, request, *args, **kwargs):
        chefs = Chef.objects.all()
        serializer = ChefSerializer(chefs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class CookbookAdd(APIView):
    def post(self, request, format=None):
        user = CustomUser.objects.get(username=request.data['username'])
        recipe = Recipe.objects.get(id=request.data['recipe_id'])
        cookbook = Cookbook(user=user, recipe=recipe)
        cookbook.save()
        return Response(status=status.HTTP_201_CREATED)
    
@csrf_exempt
def get_saved_recipes(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')

        try:
            user = CustomUser.objects.get(username=username)
            saved_entries = Cookbook.objects.filter(user=user).select_related('recipe')
            recipes = [
                {
                    'recipeName': entry.recipe.recipeName,
                    'description':entry.recipe.description,
                    'duration':entry.recipe.duration,
                    'ingredients': entry.recipe.ingredients,
                    'instructions': entry.recipe.instructions,
                    'url': entry.recipe.url,
                }
                for entry in saved_entries
            ]
            return JsonResponse(recipes, safe=False)
        except CustomUser.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)

    return JsonResponse({'error': 'Invalid request method'}, status=400)

@api_view(['GET'])
def get_recipes_by_chef(request, chef_id):
    try:
        chef = Chef.objects.get(pk=chef_id)
        recipes = chef.recipes.all()
        serializer = RecipeSerializer(recipes, many=True)
        print(serializer)
        return Response(serializer.data)
    except Chef.DoesNotExist:
        return Response(status=404, data={"error": "Chef not found"})
