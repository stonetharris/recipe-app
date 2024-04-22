// components/SearchComponent.js
import React, { useState } from 'react';

function SearchComponent() {
    const [ingredient, setIngredient] = useState('');

    const handleInputChange = (event) => {
        setIngredient(event.target.value);
    };

    const handleSearch = () => {
        console.log('Searching for recipes with:', ingredient);
        // Add logic to fetch recipes based on ingredient
    };

    return (
        <div>
            <input
                type="text"
                value={ingredient}
                onChange={handleInputChange}
                placeholder="Enter an ingredient..."
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default SearchComponent;
