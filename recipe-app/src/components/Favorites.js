// COMPLETED BY: Arnav Bhatia
// This component allows the user to mark a recipe as a favorite if they enjoyed it!
// There is a button that is always accessible for the user to navigate to his/her
// favorite stored recipes in their localStorage.
// Additionally, There is a small easter egg associated with this component that
// can be found in the RecipeDetails.js (make sure your volume is high when you favorite a recipe!)

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FavoritesContainer = styled.div`
  text-align: center;
  font-family: 'Arial', sans-serif;
`;

const FavoritesList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FavoriteItem = styled.li`
  margin: 10px 0;
  transition: color 0.2s;

  &:hover {
    color: #ff6347;
  }
`;
const FavoriteLink = styled(Link)`
  text-decoration: none;
  color: #333;
  
  &:hover {
    text-decoration: underline;
  }
`;

const NoFavoritesText = styled.p`
  color: #666;
`;

function FavoritesPage() {
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);

    useEffect(() => {
        const fetchFavoriteRecipes = async () => {
            const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
            const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
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

        fetchFavoriteRecipes();
    }, []);

    return (
        <FavoritesContainer>
            <h1>Favorite Recipes</h1>
            {favoriteRecipes.length > 0 ? (
                <FavoritesList>
                    {favoriteRecipes.map(recipe => (
                        <FavoriteItem key={recipe.id}>
                            <FavoriteLink to={`/recipe/${recipe.id}`}>{recipe.title}</FavoriteLink>
                        </FavoriteItem>
                    ))}
                </FavoritesList>
            ) : (
                <NoFavoritesText>No favorites added yet.</NoFavoritesText>
            )}
        </FavoritesContainer>
    );
}

export default FavoritesPage;