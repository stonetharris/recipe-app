import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ContactContainer = styled.div`
  padding: 40px;
  font-size: 18px;
  line-height: 1.8;
  max-width: 900px;
  margin: 40px auto;
  background-color: #fff;
  box-shadow: 0 6px 12px rgba(0,0,0,0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const TextArea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ddd;
  height: 150px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 4px;
  border: none;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const MessageSent = styled.div`
  margin-top: 20px;
  color: green;
  font-size: 18px;
`;

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => {
            navigate('/');
        }, 1000);
    };

    return (
        <ContactContainer>
            <h1>Contact Us</h1>
            {!isSubmitted ? (
                <Form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        name="name"
                        placeholder="Your name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <Input
                        type="email"
                        name="email"
                        placeholder="Your email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextArea
                        name="message"
                        placeholder="Your message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                    />
                    <SubmitButton type="submit">Send Feedback</SubmitButton>
                </Form>
            ) : (
                <MessageSent>Message sent!</MessageSent>
            )}
        </ContactContainer>
    );
};

export default Contact;
