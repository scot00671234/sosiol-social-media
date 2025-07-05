import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPosts, getCommunities, createPost } from '../api';

export default function Community() {
  const { communityId } = useParams();
  const [community, setCommunity] = useState(null);
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCommunities().then(cs => {
      const c = cs.find(c => String(c.id) === String(communityId));
      setCommunity(c);
    });
    getPosts(communityId).then(setPosts);
  }, [communityId]);

  const handleCreate = async e => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setLoading(true);
    await createPost(communityId, title, content);
    setTitle('');
    setContent('');
    getPosts(communityId).then(setPosts);
    setLoading(false);
  };

  if (!community) return <div style={{ color: '#aaa', marginTop: 40 }}>Community not found.</div>;

  return (
    <div style={{ marginTop: 24 }}>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16, color: '#222' }}>c/{community.name}</h2>
      <form onSubmit={handleCreate} style={{
        background: '#fff',
        borderRadius: 10,
        boxShadow: '0 1px 4px 0 rgba(0,0,0,0.03)',
        padding: '1.2rem 1.5rem',
        marginBottom: 28,
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Post title"
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
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Post content"
          rows={3}
          style={{
            padding: '0.7rem 1rem',
            borderRadius: 8,
            border: '1px solid #e0e0e0',
            fontSize: 16,
            background: '#fafbfc',
            color: '#222',
            outline: 'none',
            resize: 'vertical'
          }}
        />
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
        }}>Post</button>
      </form>
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
            <div style={{ display: 'flex', gap: 16, fontSize: 14, color: '#aaa' }}>
              <span>▲ {post.votes_count}</span>
            </div>
          </div>
        ))}
        {posts.length === 0 && <div style={{ color: '#aaa', textAlign: 'center', marginTop: 40 }}>No posts yet.</div>}
      </div>
    </div>
  );
} 