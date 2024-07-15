from django.db import models

class CustomUser(models.Model):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)

    def __str__(self):
        return self.username

class Chef(models.Model):
    name = models.CharField(max_length=255)
    url = models.URLField()
    information = models.TextField()
    def __str__(self):
        return self.name

class Recipe(models.Model):
    recipeName = models.CharField(max_length=255)
    url = models.URLField()
    description = models.TextField()
    duration = models.CharField(max_length=100)
    ingredients = models.TextField()
    instructions = models.TextField()
    cooked_by = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True)
    chef = models.ForeignKey(Chef, on_delete=models.SET_NULL, null=True, blank=True, related_name='recipes', default=None)

    def __str__(self):
        return self.recipeName

class Cookbook(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.username}'s cookbook"