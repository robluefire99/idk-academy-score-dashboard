import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function VerifyEmailPage() {
  const { token } = useParams();
  const [status, setStatus] = useState('Verifying...');

  useEffect(() => {
    axios.get(`/api/auth/verify/${token}`)
      .then(res => setStatus(res.data.message))
      .catch(err => setStatus(err.response?.data?.message || 'Verification failed.'));
  }, [token]);

  return (
    <div style={{ textAlign: 'center', marginTop: 40 }}>
      <h2>{status}</h2>
    </div>
  );
}
