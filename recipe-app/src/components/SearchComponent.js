import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SearchComponent = () => {
    const [ingredients, setIngredients] = useState('');
    const [recipes, setRecipes] = useState([]);

    const fetchRecipes = async () => {
        const API_KEY = '4bb1916ca4a24970a838a8e55b08d758';
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
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={ingredients}
                    onChange={e => setIngredients(e.target.value)}
                    placeholder="Enter ingredients separated by commas"
                />
                <button type="submit">Search</button>
            </form>
            {recipes.length > 0 && (
                <ul>
                    {recipes.map(recipe => (
                        <li key={recipe.id}>
                            {/* Wrap the title with a Link to direct to the details page */}
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
