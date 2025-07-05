import React, { useState } from 'react';
import { createCommunity } from '../api';
import { useNavigate } from 'react-router-dom';

export default function CreateCommunity() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async e => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    setError('');
    const res = await createCommunity(name.trim());
    if (res.error) {
      setError(res.error);
      setLoading(false);
    } else {
      navigate(`/c/${res.id}`);
    }
  };

  return (
    <div style={{ marginTop: 40 }}>
      <form onSubmit={handleCreate} style={{
        background: '#fff',
        borderRadius: 10,
        boxShadow: '0 1px 4px 0 rgba(0,0,0,0.03)',
        padding: '1.2rem 1.5rem',
        maxWidth: 400,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8, color: '#222' }}>Create Community</h2>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Community name"
          style={{
            padding: '0.7rem 1rem',
            borderRadius: 8,
            border: '1px solid #e0e0e0',
            fontSize: 16,
            background: '#fafbfc',
            color: '#222',
            outline: 'none'
          }}
        />
        {error && <div style={{ color: '#d33', fontSize: 14 }}>{error}</div>}
        <button type="submit" disabled={loading} style={{
          background: '#f5f6fa',
          border: '1px solid #e0e0e0',
          borderRadius: 8,
          padding: '0.7rem 1.2rem',
          fontSize: 16,
          color: '#222',
          fontWeight: 500,
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.6 : 1
        }}>Create</button>
      </form>
    </div>
  );
} 