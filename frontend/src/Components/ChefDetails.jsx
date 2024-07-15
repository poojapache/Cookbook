import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeList from "./RecipeList";
import RecipeDetails from "./RecipeDetails";
import '../App.css';

export default function ChefDetails({ chef }) {
    const [recipeDetails, setRecipeDetails] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        console.log(`${process.env.REACT_APP_API_BASE_URL}/chefs/${chef.id}/recipes`);
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/chefs/${chef.id}/recipes`)
            .then(response => {
                setRecipes(response.data);
            })
            .catch(error => {
                console.error("Error fetching recipes:", error);
            });
    }, [chef]);

    const showRecipeDetails = (recipe) => {
        setSelectedRecipe(recipe);
        setRecipeDetails(true);
    };

    const hideRecipeDetails = () => {
        setRecipeDetails(false);
        setSelectedRecipe(null);
    };

    return (
        <div className="chef-details-outer-container">
            <div className="chef-details-container">
                <img src={chef.url} alt={chef.name}></img>
                <div className="chef-information-container">
                    <h1 className="chef-name">{chef.name}</h1>
                    <p>{chef.information}</p>
                </div>
            </div>
            {
                !recipeDetails ? (
                    <div className="chef-cookbook-content-container">
                        <div className="chef-recipe-container">
                            <div className="title-bar">
                                <h2>Recipes by {chef.name}</h2>
                            </div>
                            <RecipeList recipes={recipes} showRecipeDetails={showRecipeDetails} />
                        </div>
                    </div>
                ) : (
                    <RecipeDetails activetAdd={false} recipe={selectedRecipe} hideRecipeDetails={hideRecipeDetails} />
                )
            }
        </div>
    );
}
