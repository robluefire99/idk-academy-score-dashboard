import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { login } from '../redux/authSlice';

export default function OAuthHandler() {
  const [params] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get('token');
    if (token) {
      dispatch(login.fulfilled({ token, id: null, name: null, role: null }));
      localStorage.setItem('token', token);
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [params, dispatch, navigate]);

  return <p>Logging in via Google…</p>;
}