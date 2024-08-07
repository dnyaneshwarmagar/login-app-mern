import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader';
import BACKEND_APP_API_URL from '../utils/url';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const [captchaImage, setCaptchaImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate()
  useEffect(() => {
    const fetchCaptcha = async () => {
      const response = await axios.get(`${BACKEND_APP_API_URL}/captcha`);
      console.log('response: ', response);
      setCaptchaImage(response.data.captcha);
      setCaptchaToken(response.data.captchaToken);
    };
    fetchCaptcha();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${BACKEND_APP_API_URL}/login`, {
        username, password, captcha, captchaToken
      });
      setLoading(false);
      console.log("login successful");

      navigate('/message',{ state: { message:"Login successful!" }});
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.error || 'Something went wrong');
      const response = await axios.get(`${BACKEND_APP_API_URL}/captcha`);
      setCaptchaImage(response.data.captcha);
      setCaptchaToken(response.data.captchaToken);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>{captchaImage}</div>
        <input
          type="text"
          placeholder="Enter CAPTCHA"
          value={captcha}
          onChange={(e) => setCaptcha(e.target.value)}
        />
        <button type="submit" disabled={loading}>Login</button>
        <br/>
        <br/>
        <Link to="/forgot">Forgot Password</Link>
      </form>
      {loading && <Loader />}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
