import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const API_KEY = process.env.SPOONACULAR_API_KEY;
const ingredient = 'olive oil';

async function fetchRecipes() {
    const fetch = (await import('node-fetch')).default;
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredient)}&number=10&apiKey=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Recipes found:', data);
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

fetchRecipes();
