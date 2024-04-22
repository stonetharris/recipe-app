import {env} from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const API_KEY = env.SPOONACULAR_API_KEY;
// const API_KEY = '-----put API key in here if below does not work------';
const BASE_URL = 'https://api.spoonacular.com';

export async function getRandomRecipes() {
    const url = `${BASE_URL}/recipes/random?apiKey=${API_KEY}&number=10`;  // fetch 10 random recipes
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.recipes;
    } catch (error) {
        console.error("Failed to fetch recipes:", error);
        return [];
    }
}
