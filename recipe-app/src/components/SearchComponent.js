// Hi!, this is Stone Harris, and this is one of the two components I am responsible for
// This component essentially uses the fetchRecipes() function that I wrote to use the
// API to match recipes to the user's input of ingredients

import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchHistory from './SearchHistory';
import styled from 'styled-components';

// styled-components work:
const SearchContainer = styled.div`
  position: relative;
  margin: 20px auto;
  max-width: 500px;
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

const Input = styled.input`
  font-size: 18px;
  padding: 10px 15px;
  border: 2px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  width: calc(100% - 120px);
  box-sizing: border-box;
  margin-right: 10px;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  font-size: 18px;
  padding: 10px 20px;
  background-color: #007bff;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const RecipeList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
`;

const RecipeItem = styled.li`
  margin-bottom: 10px;
`;

const RecipeTitle = styled.h2`
  font-size: 1.2em;
`;

const RecipeImage = styled.img`
  width: 100%;
  max-width: 200px;
  border-radius: 5px;
`;

const SearchComponent = ({ onSearchSubmit }) => {
    const [ingredients, setIngredients] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    // this is the main function that drives the component. Simple API fetch just passing along the input ingredients (separated by comma)
    const fetchRecipes = async () => {
        const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
        const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredients)}&number=10&apiKey=${API_KEY}`;

        try {
            const response = await axios.get(url);
            setRecipes(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    };

    // straight forward handling of user clicking the search button
    const handleSubmit = (event) => {
        event.preventDefault();
        fetchRecipes();
        onSearchSubmit(ingredients);
    };

    // this function and the handleBlur below it work in tandem in displaying the actual dropdown
    // bar that holds search history (see SearchHistory.js for more detail)
    const handleFocus = () => {
        setShowDropdown(true);
        console.log("handleFocus set true");
    };

    const handleBlur = () => {
        setTimeout(() => setShowDropdown(false), 200);
        console.log("handleBlur set false");
    };

    //the return is relatively simple i think, just the input with the search bar and
    // then replicating app.js's logic for displaying results
    return (
        <SearchContainer>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    value={ingredients}
                    onChange={e => setIngredients(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Enter ingredients separated by commas"
                />
                <Button type="submit">Search</Button>
            </Form>
            {showDropdown && <SearchHistory onSearchFromHistory={onSearchSubmit} />}
            {recipes.length > 0 && (
                <RecipeList>
                    {recipes.map(recipe => (
                        <RecipeItem key={recipe.id}>
                            <Link to={`/recipe/${recipe.id}`}>
                                <RecipeImage src={recipe.image} alt={recipe.title} />
                                <RecipeTitle>{recipe.title}</RecipeTitle>
                            </Link>
                        </RecipeItem>
                    ))}
                </RecipeList>
            )}
        </SearchContainer>
    );
};

export default SearchComponent;
