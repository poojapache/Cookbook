"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from .views import CustomUserCreateView, LoginView, RecipeListView, ChefListView, CookbookAdd, get_saved_recipes, get_recipes_by_chef

urlpatterns = [
    path('api/signup/', CustomUserCreateView.as_view(), name='user-create'),
    path('api/login/', LoginView.as_view(), name='user-login'),
    path('api/recipes/', RecipeListView.as_view(), name='recipe-list'),
    path('api/chefs/', ChefListView.as_view(), name='recipe-list'),
    path('api/cookbooks/add/', CookbookAdd.as_view(), name='cookbook-add'),
    path('api/cookbooks/getSavedRecipes/', get_saved_recipes, name='get_saved_recipes'),
    path('api/chefs/<int:chef_id>/recipes/', get_recipes_by_chef, name='get_recipes_by_chef'),
]
