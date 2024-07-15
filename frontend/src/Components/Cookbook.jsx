import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeList from "./RecipeList";
import RecipeDetails from "./RecipeDetails";

export default function Cookbook({userData})
{
    const [recipeDetails, setRecipeDetails] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        console.log(`${process.env.REACT_APP_API_BASE_URL}/cookbooks/getSavedRecipes/`);
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/cookbooks/getSavedRecipes/`, {
            username: userData.username
            })
            .then(response => {
                setRecipes(response.data);
            })
            .catch(error => {
                console.error("Error fetching recipes:", error);
            });
    }, []);

    const showRecipeDetails = (recipe) => {
        setSelectedRecipe(recipe);
        setRecipeDetails(true);
    };

    const hideRecipeDetails = () => {
        setRecipeDetails(false);
        setSelectedRecipe(null);
    };

    return(
        recipes.length === 0?
        <h1 className="nothing-text">Nothing to show yet!</h1>:
        !recipeDetails ? (
            <div  className="cookbook-content-container">
            <div className="recipe-container">
                <div className="title-bar">
                    <h2>Saved by you</h2>
                </div>
                <RecipeList recipes={recipes} showRecipeDetails={showRecipeDetails} />
            </div>
        </div>
        ) : (
            <RecipeDetails activetAdd = {false} recipe={selectedRecipe} hideRecipeDetails={hideRecipeDetails} userData={userData} />
        )

    )
}