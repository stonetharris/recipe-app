import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchComponent from './components/SearchComponent.js';

function App() {
  const [recipes, setRecipes] = useState([]);

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
        <h1>Random Recipes</h1>
          <SearchComponent />
        {recipes.map(recipe => (
            <div key={recipe.id}>
              <h2>{recipe.title}</h2>
              <img src={recipe.image} alt={recipe.title} />
            </div>
        ))}
      </div>
  );
}

export default App;
