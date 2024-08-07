import React, { useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import { useNavigate, useParams } from 'react-router-dom';
import BACKEND_APP_API_URL from '../utils/url';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await axios.post(`${BACKEND_APP_API_URL}/reset-password/${token}`, {
        password
      });
      setLoading(false);
      setMessage(response.data.message);
      navigate('/message',{ state: { message:"Password has been updated successfully!" }});
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>Reset Password</button>
      </form>
      {loading && <Loader />}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ResetPassword;
