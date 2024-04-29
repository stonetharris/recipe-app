// Freddy completed this component. It utilizes the RecipeDetails component and creates a shopping list
// for all unchecked ingredients when a user to looking at a recipe. Then, one can access their list
// by clicking the button at the top.

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ListContainer = styled.div`
  padding: 20px;
  font-family: 'Arial', sans-serif;
`;

const ListItem = styled.li`
  list-style-type: none;
  margin: 5px 0;
`;

const Button = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #c82333;
  }
`;

function ShoppingList() {
    const [shoppingList, setShoppingList] = useState([]);

    useEffect(() => {
        const storedShoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
        setShoppingList(storedShoppingList);
    }, []);

    const handleRemoveItem = (index) => {
        const updatedShoppingList = [...shoppingList];
        updatedShoppingList.splice(index, 1);
        setShoppingList(updatedShoppingList);
        localStorage.setItem('shoppingList', JSON.stringify(updatedShoppingList));
    };

    return (
        <ListContainer>
            <h1>Shopping List</h1>
            {shoppingList.length > 0 ? (
            <ul>
                {shoppingList.map((item, index) => (
                    <ListItem key={index}>
                        {item}
                        <Button onClick={() => handleRemoveItem(index)}>Remove</Button>
                    </ListItem>
                ))}
            </ul>
                ) : (
                    <p>Your shopping list is empty</p>

                )}
        </ListContainer>
    );
}

export default ShoppingList;
