import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function RecipeDetails() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [similarRecipes, setSimilarRecipes] = useState([]);

    useEffect(() => {
        const apiKey = '4bb1916ca4a24970a838a8e55b08d758';
        const fetchDetails = async () => {
            try {
                // Fetching recipe details
                const detailsResponse = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`);
                setRecipe(detailsResponse.data);

                // Fetching ingredients
                const ingredientsResponse = await axios.get(`https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${apiKey}`);
                setIngredients(ingredientsResponse.data.ingredients);

                // Fetching similar recipes
                const similarResponse = await axios.get(`https://api.spoonacular.com/recipes/${id}/similar?apiKey=${apiKey}`);
                setSimilarRecipes(similarResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDetails();
    }, [id]);

    if (!recipe) return <div>Loading...</div>;

    return (
        <div>
            <h1>{recipe.title}</h1>
            <img src={recipe.image} alt={recipe.title} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
            <h2>Ingredients</h2>
            <ul>
                {ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient.name} - {ingredient.amount.metric.value} {ingredient.amount.metric.unit}</li>
                ))}
            </ul>
            <button style={{ margin: '10px 0' }}>Recipe Instructions</button> {/* Here is the placeholder button */}
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