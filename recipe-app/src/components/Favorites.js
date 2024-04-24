import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function FavoritesPage() {
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);

    useEffect(() => {
        const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

        // Fetch the details for each favorite recipe by its ID
        const fetchFavoriteRecipes = async () => {
            try {
                const recipes = await Promise.all(
                    storedFavorites.map(id =>
                        axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
                            .then(response => response.data)
                    )
                );
                setFavoriteRecipes(recipes);
            } catch (error) {
                console.error('Error fetching favorite recipes:', error);
            }
        };

        if (storedFavorites.length > 0) {
            fetchFavoriteRecipes();
        }
    }, []);

    return (
        <div>
            <h1>Favorite Recipes</h1>
            {favoriteRecipes.length > 0 ? (
                <ul>
                    {favoriteRecipes.map(recipe => (
                        <li key={recipe.id}>
                            <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No favorites added yet.</p>
            )}
        </div>
    );
}

export default FavoritesPage;