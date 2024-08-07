import React, { useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import BACKEND_APP_API_URL from '../utils/url';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await axios.post(`${BACKEND_APP_API_URL}/request-reset-password`, {
        email
      });
      setLoading(false);
      setMessage(response.data.message);
      navigate('/message',{ state: { message:"Link has been sent to email, reset password using that!" }});
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" disabled={loading}>Submit</button>
      </form>
      {loading && <Loader />}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ForgotPassword;
