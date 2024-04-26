import React, { useState, useEffect } from 'react';

const SearchHistoryComponent = ({ onSearchFromHistory  }) => {
    const [searchHistory, setSearchHistory] = useState([]);

    useEffect(() => {
        const history = localStorage.getItem('searchHistory');
        if (history) {
            setSearchHistory(JSON.parse(history));
        }
    }, []);


    return (
        <ul style={{ position: 'absolute', zIndex: 1000, listStyle: 'none', padding: 0 }}>
            {searchHistory.map((query, index) => (
                <li key={index} onClick={() => onSearchFromHistory(query)} style={{ cursor: 'pointer' }}>
                    {query}
                </li>
            ))}
        </ul>
    );
};

export default SearchHistoryComponent;