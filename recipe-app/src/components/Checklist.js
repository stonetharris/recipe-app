import React, { useState } from 'react';

function IngredientsChecklist({ ingredients }) {
    const [checkedItems, setCheckedItems] = useState(new Array(ingredients.length).fill(false));

    const handleCheck = (index) => {
        const updatedCheckedItems = [...checkedItems];
        updatedCheckedItems[index] = !updatedCheckedItems[index];
        setCheckedItems(updatedCheckedItems);
    };

    return (
        <div>
            {ingredients.map((ingredient, index) => (
                <div key={index}>
                    <input
                        type="checkbox"
                        id={`checkbox-${index}`}
                        checked={checkedItems[index]}
                        onChange={() => handleCheck(index)}
                    />
                    <label htmlFor={`checkbox-${index}`}>{ingredient}</label>
                </div>
            ))}
        </div>
    );
}

export default IngredientsChecklist;