import React from "react";
import axios from "axios";
import Footer from "./Footer";

export default function RecipeDetails({ activetAdd, recipe, hideRecipeDetails, userData }) {
    const addToCookbook = () => {
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/cookbooks/add/`, {
            username: userData.username,
            recipe_id: recipe.id
        })
        .then(response => {
            alert("Recipe added to your cookbook!");
        })
        .catch(error => {
            console.error("Error adding recipe to cookbook:", error);
        });
    };

    return (
        <>
        <div className="recipe-details-container">
            <div className="upper-container">
                <button className="btn back-btn" onClick={hideRecipeDetails}>⬅Back</button>
                <div className="title-container">
                    <h1 className="recipe-title">{recipe.recipeName}</h1>
                    <h4>{recipe.cooked_by === null ? "" : recipe.cooked_by}</h4>
                </div>
                {activetAdd?<button className="btn add-btn" onClick={addToCookbook}>Add+</button>:""}
            </div>
           
            <div className="recipe-img-large-container">
                <img className="recipe-img-large" src={recipe.url} alt={recipe.recipeName}></img>
            </div>
            <table className="recipe-details-table">
                <tbody>
                    <tr>
                        <td className="row-title">Duration</td>
                        <td>{recipe.duration}</td>
                    </tr>
                    <tr>
                        <td className="row-title">Ingredients</td>
                        <td>{recipe.ingredients}</td>
                    </tr>
                    <tr>
                        <td className="row-title">Instructions</td>
                        <td>{recipe.instructions}</td>
                    </tr>
                </tbody>
            </table>
           
        </div>
         <Footer/>
         </>
    );
}
