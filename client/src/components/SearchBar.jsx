import React, { useState } from 'react';
import { search } from '../api';
import { Link } from 'react-router-dom';

export default function SearchBar() {
  const [q, setQ] = useState('');
  const [results, setResults] = useState(null);
  const [show, setShow] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    const res = await search(q);
    setResults(res);
    setShow(true);
  };

  return (
    <div style={{ position: 'relative', marginBottom: 32 }}>
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: 8 }}>
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search posts, communities, comments..."
          style={{
            flex: 1,
            padding: '0.7rem 1rem',
            borderRadius: 8,
            border: '1px solid #e0e0e0',
            fontSize: 16,
            background: '#fff',
            color: '#222',
            outline: 'none',
            boxShadow: '0 1px 4px 0 rgba(0,0,0,0.01)'
          }}
        />
        <button type="submit" style={{
          background: '#f5f6fa',
          border: '1px solid #e0e0e0',
          borderRadius: 8,
          padding: '0.7rem 1.2rem',
          fontSize: 16,
          color: '#222',
          fontWeight: 500,
          cursor: 'pointer'
        }}>Search</button>
      </form>
      {show && results && (
        <div style={{
          position: 'absolute',
          top: '110%',
          left: 0,
          right: 0,
          background: '#fff',
          border: '1px solid #eee',
          borderRadius: 8,
          boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
          zIndex: 10,
          padding: 12,
          marginTop: 4
        }}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>Posts</div>
          {results.posts.length === 0 && <div style={{ color: '#aaa' }}>No posts found.</div>}
          {results.posts.map(post => (
            <div key={post.id}>
              <Link to={`/post/${post.id}`} style={{ color: '#222', textDecoration: 'none' }}>{post.title}</Link>
            </div>
          ))}
          <div style={{ fontWeight: 600, margin: '10px 0 6px' }}>Communities</div>
          {results.communities.length === 0 && <div style={{ color: '#aaa' }}>No communities found.</div>}
          {results.communities.map(c => (
            <div key={c.id}>
              <Link to={`/c/${c.id}`} style={{ color: '#222', textDecoration: 'none' }}>c/{c.name}</Link>
            </div>
          ))}
          <div style={{ fontWeight: 600, margin: '10px 0 6px' }}>Comments</div>
          {results.comments.length === 0 && <div style={{ color: '#aaa' }}>No comments found.</div>}
          {results.comments.map(comment => (
            <div key={comment.id} style={{ color: '#555', fontSize: 14, marginBottom: 4 }}>
              {comment.content.length > 60 ? comment.content.slice(0, 60) + '...' : comment.content}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 