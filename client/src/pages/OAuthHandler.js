import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { loadMe } from '../redux/authSlice';

export default function OAuthHandler() {
  const [params] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      dispatch(loadMe()).then(res => {
        const userData = res.payload;
        if (userData && userData.profileComplete === false) {
          navigate(`/complete-profile?token=${token}`);
        } else if (userData && userData.role) {
          if (userData.role === 'lecturer') navigate('/lecturer');
          else navigate('/student');
        } else {
          navigate('/');
        }
      });
    } else {
      navigate('/login');
    }
  }, [params, dispatch, navigate]);

  return <p>Logging in via Google…</p>;
}