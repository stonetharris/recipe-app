import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavBarContainer = styled.nav`
  background: #f8f9fa;
  padding: 20px; 
  text-align: left;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  margin-right: 30px; 
  font-size: 20px; 
  &:hover {
    color: #007bff;
  }
`;

const HomeButton = styled.button`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 12px 24px; 
  text-align: center;
  display: inline-block;
  font-size: 20px;
  margin: 0 4px; 
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: #45a049;
  }
`;

const NavBar = () => {
    return (
        <NavBarContainer>
            <StyledLink to="/"><HomeButton>Home</HomeButton></StyledLink>
            <StyledLink to="/about">About</StyledLink>
            <StyledLink to="/contact">Contact</StyledLink>
            <StyledLink to="/favorites">Favorites</StyledLink>
        </NavBarContainer>
    );
};

export default NavBar;
