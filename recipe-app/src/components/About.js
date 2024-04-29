// Milan completed this component. It provides a description of our entire web app when a user clicks
// the "About" button.

import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
    padding: 40px;
    font-size: 18px;
    line-height: 1.8;
    max-width: 900px;
    margin: 40px auto;
    background-color: #fff;
    box-shadow: 0 6px 12px rgba(0,0,0,0.1);
`;

const SectionHeading = styled.h1`
    font-size: 36px;
    color: #4CAF50;
    margin-bottom: 24px;
`;

const Paragraph = styled.p`
    color: #666;
    margin-bottom: 20px;
`;

const ImageGallery = styled.div`
    display: flex;
    justify-content: space-around;
    gap: 30px;
    margin-top: 30px;
`;

const DishImage = styled.img`
    width: 250px;
    height: 200px;
    border-radius: 12px;
    object-fit: cover;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
`;

const About = () => {
    return (
        <AboutContainer>
            <SectionHeading>About Us</SectionHeading>
            <Paragraph>Welcome to our recipe site! Here, we share a passion for discovering new and exciting recipes. Our mission is to help you find the perfect recipe for any occasion. Whether you're a seasoned chef or just starting out, we have something for everyone.</Paragraph>
            <Paragraph>This project was created to demonstrate our love for cooking and to build a community around sharing culinary knowledge and experiences.</Paragraph>
            <ImageGallery>
                <DishImage src="./burger.png" alt="Dish 1" />
                <DishImage src="./palak.png" alt="Dish 2" />
                <DishImage src="./lamb.png" alt="Dish 3" />
            </ImageGallery>
        </AboutContainer>
    );
};

export default About;
