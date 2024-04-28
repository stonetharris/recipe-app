import React from 'react';

function IngredientsChecklist({ ingredients,checkedItems, onCheckChange }) {


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