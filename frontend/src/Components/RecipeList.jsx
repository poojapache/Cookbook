import React from "react";
import RecipeCard from "./RecipeCard";

export default function RecipeList({ recipes, showRecipeDetails }) {
    return (
        <div className="recipe-list-container">
            {
                recipes.map((element, index) => (
                    <RecipeCard key={index} recipe={element} showRecipeDetails={() => showRecipeDetails(element)} />
                ))
            }
        </div>
    );
}
