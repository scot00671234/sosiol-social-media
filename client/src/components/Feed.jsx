import React, { useEffect, useState } from 'react';
import { getPosts, getCommunities } from '../api';
import { Link, useNavigate } from 'react-router-dom';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [communities, setCommunities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPosts().then(setPosts);
    getCommunities().then(setCommunities);
  }, []);

  const getCommunityName = (id) => {
    const c = communities.find(c => c.id === id);
    return c ? c.name : '';
  };

  return (
    <div style={{ marginTop: 24 }}>
      <button onClick={() => navigate('/create-community')} style={{
        background: '#f5f6fa',
        border: '1px solid #e0e0e0',
        borderRadius: 8,
        padding: '0.5rem 1.2rem',
        fontSize: 16,
        marginBottom: 24,
        cursor: 'pointer',
        color: '#222',
        fontWeight: 500
      }}>+ Create Community</button>
      <div>
        {posts.map(post => (
          <div key={post.id} style={{
            background: '#fff',
            borderRadius: 10,
            boxShadow: '0 1px 4px 0 rgba(0,0,0,0.03)',
            marginBottom: 20,
            padding: '1.2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: 6
          }}>
            <Link to={`/post/${post.id}`} style={{
              fontSize: 20,
              fontWeight: 600,
              color: '#222',
              textDecoration: 'none',
              marginBottom: 4
            }}>{post.title}</Link>
            <div style={{ fontSize: 14, color: '#888', marginBottom: 6 }}>
              <Link to={`/c/${post.community_id}`} style={{ color: '#888', textDecoration: 'underline' }}>
                c/{getCommunityName(post.community_id)}
              </Link>
            </div>
            <div style={{ display: 'flex', gap: 16, fontSize: 14, color: '#aaa' }}>
              <span>▲ {post.votes_count}</span>
              {/* Comment count will be shown in Post page for simplicity */}
            </div>
          </div>
        ))}
        {posts.length === 0 && <div style={{ color: '#aaa', textAlign: 'center', marginTop: 40 }}>No posts yet.</div>}
      </div>
    </div>
  );
} 