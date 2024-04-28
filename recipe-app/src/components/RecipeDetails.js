import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import IngredientsChecklist from './Checklist';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  font-family: 'Arial', sans-serif;
`;

const Title = styled.h1`
  color: #333;
  text-align: center;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 10px 0;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  margin-top: 20px;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin: 10px 0;
`;

const Subtitle = styled.h3`
  color: #333;
`;

function RecipeDetails() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [similarRecipes, setSimilarRecipes] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const audioRef = useRef(null);

    const updateFavoriteStatus = useCallback(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFavorite(storedFavorites.includes(id));
    }, [id]);

    useEffect(() => {
        const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;

        const fetchDetails = async () => {
            try {
                const detailsResponse = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
                setRecipe(detailsResponse.data);

                const ingredientsResponse = await axios.get(`https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${API_KEY}`);
                const formattedIngredients = ingredientsResponse.data.ingredients.map(ing => `${ing.name} - ${ing.amount.metric.value} ${ing.amount.metric.unit}`);
                setIngredients(formattedIngredients);

                const similarResponse = await axios.get(`https://api.spoonacular.com/recipes/${id}/similar?apiKey=${API_KEY}`);
                setSimilarRecipes(similarResponse.data.slice(0, 5));
            } catch (error) {
                console.error('Error fetching data:', error);
            }

            updateFavoriteStatus();
        };

        fetchDetails();
    }, [id, updateFavoriteStatus]);


    const toggleFavorite = useCallback(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (isFavorite) {
            const filteredFavorites = storedFavorites.filter(favId => favId !== id);
            localStorage.setItem('favorites', JSON.stringify(filteredFavorites));
            setIsFavorite(false);
        } else {
            storedFavorites.push(id);
            localStorage.setItem('favorites', JSON.stringify(storedFavorites));
            setIsFavorite(true);
        }

        if (audioRef.current) {
            audioRef.current.play();
        }
    }, [id, isFavorite]);

    if (!recipe) return <Container> Please be patient as we gather the details </Container>;

    return (
        <Container>
            <Title>{recipe.title}</Title>
            <audio ref={audioRef} src="/davoodi.m4a" preload="auto"></audio>
            {/*<button style={{margin: '10px 0'}}>Recipe Instructions</button>*/}
            <Button>Recipe Instructions</Button>
            <Button>Recipe styles</Button>
            <br></br>
            <button onClick={toggleFavorite} style={{margin: '10px 0'}}>
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
            <br></br>
            <Image src={recipe.image} alt={recipe.title} />
            <Subtitle>Ingredients</Subtitle>
            <IngredientsChecklist ingredients={ingredients} />
            {recipe.dishTypes.length > 0 && (
                <>
                    <h3>Dish Types</h3>
                    <p>{recipe.dishTypes.join(", ")}</p>
                </>
            )}
            {recipe.winePairing.length > 0 && (
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
            {recipe.cuisines.length > 0 && (
                <>
                    <h3>Cuisines</h3>
                    <p>{recipe.cuisines.join(", ")}</p>
                </>
            )}
            {recipe.preparationMinutes && (
                <>
                    <h3>Preparation Time</h3>
                    <p>{recipe.preparationMinutes} minutes</p>
                </>
            )}
            {recipe.cookingMinutes && (
                <>
                    <h3>Cooking Time</h3>
                    <p>{recipe.cookingMinutes} minutes</p>
                </>
            )}
            {similarRecipes.length > 0 && (
                <div>
                    <Subtitle>Similar Recipes</Subtitle>
                    <List>
                        {similarRecipes.map(similar => (
                            <ListItem key={similar.id}>
                                <Link to={`/recipe/${similar.id}`}>{similar.title}</Link>
                            </ListItem>
                        ))}
                    </List>
                </div>
            )}
        </Container>
    );
}

export default RecipeDetails;