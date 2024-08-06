// frontend/src/components/Login.js
import React, { useState, useEffect } from 'react';
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

  img {
    margin: 0.5rem;
  }
`;

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [captcha, setCaptcha] = useState('');
  const [captchaText, setCaptchaText] = useState('');

  const fetchCaptcha = async () => {
    const res = await axios.get('/auth/captcha');
    setCaptcha(res.data.captcha);
    setCaptchaText('');
  };
  useEffect(() => {
    fetchCaptcha();
  }, []);

  const { username, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onCaptchaChange = (e) => setCaptchaText(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', { ...formData, captcha: captchaText });
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={onSubmit}>
        <div>
          <input type="text" name="username" value={username} onChange={onChange} placeholder="Username" required />
        </div>
        <div>
          <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
        </div>
        <img src={captcha} alt="captcha" />
        <div>
          <input type="text" name="captcha" value={captchaText} onChange={onCaptchaChange} placeholder="Enter CAPTCHA" required />
        </div>
        <button type="submit">Login</button>
      </Form>
    </FormContainer>
  );
};

export default Login;
