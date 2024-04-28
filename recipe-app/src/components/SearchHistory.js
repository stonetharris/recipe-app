import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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

    useEffect(() => {
        const history = localStorage.getItem('searchHistory');
        if (history) {
            setSearchHistory(JSON.parse(history));
        }
    }, []);


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