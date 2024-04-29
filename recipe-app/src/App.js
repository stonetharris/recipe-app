// COMPLETED BY: EVERYONE!
// This was a team effort to make sure all pages are redirected to our individual
// components using react-router-dom. The dynamic call to our API keys is in a .env.local
// file so make sure you create a Spoonacular account (free) and set up your API key so
// our code can dynamically make the call for you!
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import RecipeDetails from './components/RecipeDetails';
import SearchComponent from './components/SearchComponent';
import Favorites from "./components/Favorites";
import NavBar from './components/NavBar';
import styled from 'styled-components';
import About from "./components/About";
import Contact from "./components/Contact";
import ShoppingList from './components/ShoppingList';


const AppContainer = styled.div`
  text-align: center;
  font-family: 'Arial', sans-serif;
`;

const RecipeList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const RecipeCard = styled.div`
  border: 1px solid #eaeaea;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
`;

const RecipeImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
`;

const RecipeTitle = styled.h2`
  color: #333;
`;

const MainHeading = styled.h1`
  color: #333;
  margin-top: 0;
  padding-top: 20px;
`;

function App() {
    const [recipes, setRecipes] = useState([]);
    const location = useLocation();
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
        let updatedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        updatedHistory = [...new Set([query, ...updatedHistory])];
        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
        console.log(updatedHistory);
        fetchRecipes(query);
    };

    return (
        <div>
        <AppContainer>
            <NavBar />
            {isHomepage && (
                <>
                    <MainHeading>Random Recipes</MainHeading>
                    <SearchComponent onSearchSubmit={updateSearchHistoryAndSearch}/>
                    <RecipeList>
                        {recipes.map(recipe => (
                            <RecipeCard key={recipe.id}>
                                <Link to={`/recipe/${recipe.id}`}>
                                    <RecipeImage src={recipe.image} alt={recipe.title}/>
                                    <RecipeTitle>{recipe.title}</RecipeTitle>
                                </Link>
                            </RecipeCard>
                        ))}
                    </RecipeList>
                </>
            )}
            <Routes>
                <Route path="/recipe/:id" element={<RecipeDetails/>}/>
                <Route path="/favorites" element={<Favorites/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/shopping-list" element={<ShoppingList/>}/>
            </Routes>
        </AppContainer>
        </div>
    );
}

export default App;
