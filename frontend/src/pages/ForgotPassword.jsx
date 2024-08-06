// frontend/src/components/ForgotPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7;
`;

const Form = styled.form`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;

  @media (max-width: 600px) {
    padding: 1rem;
  }

  div {
    margin-bottom: 1rem;
  }

  input {
    width: calc(100% - 2rem);
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin: 0 1rem;

    @media (max-width: 600px) {
      width: calc(100% - 1rem);
      margin: 0.5rem;
    }
  }

  button {
    width: 100%;
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    background: #007bff;
    color: #fff;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: #0056b3;
    }
  }
`;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/request-reset-password', { email });
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={onSubmit}>
        <div>
          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        </div>
        <button type="submit">Request Password Reset</button>
      </Form>
    </FormContainer>
  );
};

export default ForgotPassword;
