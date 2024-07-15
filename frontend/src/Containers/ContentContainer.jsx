import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeList from "../Components/RecipeList";
import ChefList from "../Components/ChefList";
import RecipeDetails from "../Components/RecipeDetails";
import Cookbook from "../Components/Cookbook";
import ChefDetails from "../Components/ChefDetails";
import Footer from "../Components/Footer";

export default function ContentContainer({ userData, onSignOut }) {
    const [recipeDetails, setRecipeDetails] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const [chefs, setChefs] = useState([]);
    const [showAllRecipes, setShowAllRecipes] = useState(false);
    const [page, setPage] = useState('Dashboard');
    const [selectedChef, setSelectedChef] = useState(null);
    const [chefDetails, setChefDetails] = useState(false);

    useEffect(() => {
        console.log(`${process.env.REACT_APP_API_BASE_URL}/recipes/`);
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/recipes/`)
            .then(response => {
                setRecipes(response.data);
            })
            .catch(error => {
                console.error("Error fetching recipes:", error);
            });

        axios.get(`${process.env.REACT_APP_API_BASE_URL}/chefs/`)
            .then(response => {
                setChefs(response.data);
            })
            .catch(error => {
                console.error("Error fetching chefs:", error);
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

    const toggleShowAllRecipes = () => {
        setShowAllRecipes(!showAllRecipes);
    };

    const showChefDetails = (chef) => {
        setSelectedChef(chef);
        setChefDetails(true);
    };

    const hideChefDetails = () => {
        setChefDetails(false);
        setSelectedChef(null);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        setRecipeDetails(false);
        setChefDetails(false);
        setSelectedRecipe(null);
        setSelectedChef(null);
    };

    const renderPage = () => {
        switch (page) {
            case 'Dashboard':
                return (
                    <div className="inside-content-container">
                        <p className="greeting">
                            😋 Welcome, {userData === null ? "User" : userData.username}!
                        </p>
                        <div className="recipe-container">
                            <div className="title-bar">
                                <h2>Recipes for you</h2>
                                <p><a href="#" onClick={toggleShowAllRecipes}>{showAllRecipes ? "Show Less" : "Show All"}</a></p>
                            </div>
                            <RecipeList recipes={showAllRecipes ? recipes : recipes.slice(0, 3)} showRecipeDetails={showRecipeDetails} />
                        </div>
                        <div className="recipe-container">
                            <div className="title-bar">
                                <h2>Top Chefs</h2>
                            </div>
                            <div className="chef-list-container">
                                <ChefList chefs={chefs} showChefDetails={showChefDetails} />
                            </div>
                        </div>
                        <Footer />
                    </div>
                );
            case 'Cookbook':
                return <Cookbook userData={userData} />;
            default:
                return null;
        }
    };

    return (
        <div className="content-container">
            <div className="navbar">
                <button className="btn nav-btn" onClick={() => handlePageChange('Dashboard')}>Dashboard</button>
                <button className="btn nav-btn" onClick={() => handlePageChange('Cookbook')}>My Cookbook</button>
                <button className="btn nav-btn" onClick={onSignOut}>Sign Out</button>
            </div>

            {!recipeDetails && !chefDetails ? (
                renderPage()
            ) : recipeDetails ? (
                <RecipeDetails activetAdd={true} recipe={selectedRecipe} hideRecipeDetails={hideRecipeDetails} userData={userData} />
            ) : (
                <ChefDetails chef={selectedChef} hideChefDetails={hideChefDetails} />
            )}
        </div>
    );
}
