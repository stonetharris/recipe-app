import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchHistory from './SearchHistory';

const SearchComponent = ({ onSearchSubmit }) => {
    const [ingredients, setIngredients] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const fetchRecipes = async () => {
        const API_KEY = 'bf85634a3ac540ccbf7aba0397c11540';
        const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredients)}&number=10&apiKey=${API_KEY}`;

        try {
            const response = await axios.get(url);
            setRecipes(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchRecipes();
        onSearchSubmit(ingredients);
    };

    const handleFocus = () => {
        setShowDropdown(true);
        console.log("handleFocus set true");
    };

    const handleBlur = () => {
        setTimeout(() => setShowDropdown(false), 200);
        console.log("handleBlur set false");
    };

    return (
        <div style={{ position: 'relative' }}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={ingredients}
                    onChange={e => setIngredients(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Enter ingredients separated by commas"
                />
                <button type="submit">Search</button>
            </form>
            {showDropdown && <SearchHistory onSearchFromHistory={onSearchSubmit} />}
            {recipes.length > 0 && (
                <ul>
                    {recipes.map(recipe => (
                        <li key={recipe.id}>
                            <Link to={`/recipe/${recipe.id}`}>
                                <h2>{recipe.title}</h2>
                            </Link>
                            <img src={recipe.image} alt={recipe.title} width="200" />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchComponent;
