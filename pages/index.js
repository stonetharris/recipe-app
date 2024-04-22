// pages/index.js
import React from 'react';
import Layout from '../components/Layout'; // Adjust the import path if needed
import { getRandomRecipes } from '@/lib/api';

const Home = ({ recipes }) => {
    return (
        <Layout>
            <h1>Random Recipes</h1>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe.id}>
                        <h2>{recipe.title}</h2>
                        <img src={recipe.image} alt={recipe.title} width="200" />
                        {/* Other recipe details */}
                    </li>
                ))}
            </ul>
        </Layout>
    );
};

export async function getServerSideProps() {
    const recipes = await getRandomRecipes();
    return {
        props: { recipes },
    };
};

export default Home;
