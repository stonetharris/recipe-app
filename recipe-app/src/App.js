import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import RecipeDetails from './components/RecipeDetails';
import SearchComponent from './components/SearchComponent';
import SearchHistory from './components/SearchHistory';
import Favorites from "./components/Favorites";

function App() {
    const [recipes, setRecipes] = useState([]);
    const location = useLocation();
    const [searchHistory, setSearchHistory] = useState([]);
    const isHomepage = location.pathname === "/";

    useEffect(() => {
        axios.get('https://api.spoonacular.com/recipes/random', {
            params: {
                apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY,
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

    const fetchRecipes = useCallback(async (searchQuery) => {
        const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
        const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(searchQuery)}&number=10&apiKey=${API_KEY}`;

        try {
            const response = await axios.get(url);
            setRecipes(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    }, []);

    const updateSearchHistoryAndSearch = (query) => {
        setSearchHistory(prevHistory => {
            const updatedHistory = [...new Set([query, ...prevHistory])];
            localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
            console.log(updatedHistory);
            return updatedHistory;
        });
        fetchRecipes(query);
    };

    return (
        <div>
            <nav>
                <Link to="/">
                    <button>Home</button>
                </Link>
                <Link to="/favorites">
                    <button>My Favorite Recipes</button>
                </Link>
            </nav>
            {isHomepage && (
                <>
                    <h1>Random Recipes</h1>
                    <SearchComponent onSearchSubmit={updateSearchHistoryAndSearch}/>
                    {recipes.map(recipe => (
                        <div key={recipe.id}>
                            <Link to={`/recipe/${recipe.id}`}>
                                <h2>{recipe.title}</h2>
                            </Link>
                            <img src={recipe.image} alt={recipe.title}/>
                        </div>
                    ))}
                </>
            )}
            <Routes>
                <Route path="/recipe/:id" element={<RecipeDetails/>}/>
                <Route path="/favorites" element={<Favorites/>}/>
            </Routes>
        </div>
    );
}

export default App;