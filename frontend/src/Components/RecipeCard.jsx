import React from "react";

export default function RecipeCard({ recipe, showRecipeDetails }) {
    return (
        <div className="recipe-card">
            <img className="recipe-img" src={recipe.url} alt={recipe.recipeName} />

            <div className="recipe-details">
                <h3 className="recipe-name">{recipe.recipeName}</h3>
                <a className="recipe-link" href="#" onClick={showRecipeDetails}>
                    View Recipe
                </a>
            </div>
        </div>
    );
}
