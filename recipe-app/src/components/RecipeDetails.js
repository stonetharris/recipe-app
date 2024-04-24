import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import IngredientsChecklist from './Checklist';

function RecipeDetails() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [similarRecipes, setSimilarRecipes] = useState([]);

    useEffect(() => {
        const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
        const fetchDetails = async () => {
            try {
                // Fetching recipe details
                const detailsResponse = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
                setRecipe(detailsResponse.data);

                // Fetching ingredients
                const ingredientsResponse = await axios.get(`https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${API_KEY}`);
                const formattedIngredients = ingredientsResponse.data.ingredients.map(ing => `${ing.name} - ${ing.amount.metric.value} ${ing.amount.metric.unit}`);
                setIngredients(formattedIngredients);

                // Fetching similar recipes
                const similarResponse = await axios.get(`https://api.spoonacular.com/recipes/${id}/similar?apiKey=${API_KEY}`);
                setSimilarRecipes(similarResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchDetails();
    }, [id]);

    if (!recipe) return <div> What an amazing selection... Please be patient as we gather the details! </div>;

    return (
        <div>
            <h1>{recipe.title}</h1>
            <button style={{ margin: '10px 0' }}>Recipe Instructions</button>
            <br></br>
            <img src={recipe.image} alt={recipe.title} style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} />
            {recipe.winePairing && (
                <div>
                    <h3>Wine Pairing</h3>
                    <p>{recipe.winePairing.pairingText}</p>
                    {recipe.winePairing.productMatches && recipe.winePairing.productMatches.map(wine => (
                        <div key={wine.id}>
                            <h5>{wine.title}</h5>
                            <p>{wine.description}</p>
                        </div>
                    ))}
                </div>
            )}
            <h3>Ingredients</h3>
            <IngredientsChecklist ingredients={ingredients} />
            <h3>Dish Types</h3>
            <p>{recipe.dishTypes.join(", ")}</p>
            <h3>Cuisines</h3>
            <p>{recipe.cuisines.join(", ")}</p>
            <h3>Preparation Time</h3>
            <p>{recipe.preparationMinutes} minutes</p>
            <h3>Cooking Time</h3>
            <p>{recipe.cookingMinutes} minutes</p>
            {similarRecipes.length > 0 && (
                <div>
                    <h3>Similar Recipes</h3>
                    <ul>
                        {similarRecipes.map(similar => (
                            <li key={similar.id}>
                                <Link to={`/recipe/${similar.id}`}>
                                    {similar.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default RecipeDetails;