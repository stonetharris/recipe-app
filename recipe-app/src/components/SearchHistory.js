// Hi! This is Stone Harris and this is the second of two components that I am responsible for.
// This component displays and styles the search history in the dropdown bar off of the input box
// The actual storing of items into local storage actually occurs in app.js.
//Here, we just style it and pull from local storage

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

//straight forward styled-components
const HistoryDropdown = styled.ul`
  position: absolute;
  z-index: 1000;
  list-style: none;
  padding: 0;
  width: 100%; 
  background-color: white; 
  border: 1px solid #ddd;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px; 
  margin-top: 8px; 
  max-height: 200px;
  overflow-y: auto;
`;

const HistoryItem = styled.li`
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f7f7f7;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #eee; 
  }
`;

const SearchHistoryComponent = ({ onSearchFromHistory  }) => {
    const [searchHistory, setSearchHistory] = useState([]);

    //grabbing past searches from local storage then parsing
    useEffect(() => {
        const history = localStorage.getItem('searchHistory');
        if (history) {
            setSearchHistory(JSON.parse(history));
        }
    }, []);


    //very simple return, just displaying the dropdown and the parsed searches in it
    return (
        <HistoryDropdown>
            {searchHistory.map((query, index) => (
                <HistoryItem key={index} onClick={() => onSearchFromHistory(query)}>
                    {query}
                </HistoryItem>
            ))}
        </HistoryDropdown>
    );
};

export default SearchHistoryComponent;