import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import RecipeDetails from './components/RecipeDetails';
import SearchComponent from './components/SearchComponent';

function App() {
    const [recipes, setRecipes] = useState([]);
    const location = useLocation();
    const isHomepage = location.pathname === "/";

    useEffect(() => {
        axios.get('https://api.spoonacular.com/recipes/random', {
            params: {
                apiKey: '4bb1916ca4a24970a838a8e55b08d758',
                number: 10
            }
        })
            .then(response => {
                setRecipes(response.data.recipes);
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
            });
    }, []);

    return (
        <div>
            {isHomepage && (
                <>
                    <h1>Random Recipes</h1>
                    <SearchComponent />
                    {recipes.map(recipe => (
                        <div key={recipe.id}>
                            <Link to={`/recipe/${recipe.id}`}>
                                <h2>{recipe.title}</h2>
                            </Link>
                            <img src={recipe.image} alt={recipe.title} />
                        </div>
                    ))}
                </>
            )}
            <Routes>
                <Route path="/recipe/:id" element={<RecipeDetails />} />
            </Routes>
        </div>
    );
}

export default App;