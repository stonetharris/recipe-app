// COMPLETED BY: Arnav Bhatia
// This component maps all the ingredients for a specific recipe and assigns checkboxes
// so it can be interactive with the user. It also adds some functionality to creating
// the shopping list when needed

import React from 'react';

function IngredientsChecklist({ ingredients, checkedItems, onCheckChange }) {
    return (
        <div>
            {ingredients.map((ingredient, index) => (
                <div key={index}>
                    <input
                        type="checkbox"
                        id={`checkbox-${index}`}
                        checked={checkedItems[index]}
                        onChange={() => onCheckChange(index)}
                    />
                    <label htmlFor={`checkbox-${index}`}>{ingredient}</label>
                </div>
            ))}
        </div>
    );
}

export default IngredientsChecklist;