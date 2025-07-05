import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPost, getComments, vote, createComment } from '../api';

function getSessionId() {
  let id = localStorage.getItem('sosiol_session');
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now();
    localStorage.setItem('sosiol_session', id);
  }
  return id;
}

function CommentTree({ comments, parentId, onReply }) {
  return comments
    .filter(c => c.parent_id === parentId)
    .map(comment => (
      <div key={comment.id} style={{
        marginLeft: parentId ? 24 : 0,
        marginTop: 12,
        padding: '0.7rem 1rem',
        background: '#fafbfc',
        borderRadius: 8,
        border: '1px solid #f0f0f0',
        fontSize: 15
      }}>
        <div style={{ marginBottom: 6 }}>{comment.content}</div>
        <div style={{ display: 'flex', gap: 16, fontSize: 13, color: '#aaa', alignItems: 'center' }}>
          <span>▲ {comment.votes_count}</span>
          <button onClick={() => onReply(comment.id)} style={{
            background: 'none',
            border: 'none',
            color: '#888',
            cursor: 'pointer',
            fontSize: 13,
            padding: 0
          }}>Reply</button>
        </div>
        <CommentTree comments={comments} parentId={comment.id} onReply={onReply} />
      </div>
    ));
}

export default function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [voted, setVoted] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPost(postId).then(setPost);
    getComments(postId).then(setComments);
    const v = localStorage.getItem('vote_post_' + postId);
    setVoted(v ? Number(v) : null);
  }, [postId]);

  const handleVote = async value => {
    if (voted === value) return;
    const session_id = getSessionId();
    await vote('post', postId, session_id, value);
    localStorage.setItem('vote_post_' + postId, value);
    getPost(postId).then(setPost);
    setVoted(value);
  };

  const handleComment = async e => {
    e.preventDefault();
    if (!comment.trim()) return;
    setLoading(true);
    await createComment(postId, replyTo, comment);
    setComment('');
    setReplyTo(null);
    getComments(postId).then(setComments);
    setLoading(false);
  };

  const handleReply = id => {
    setReplyTo(id);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  if (!post) return <div style={{ color: '#aaa', marginTop: 40 }}>Post not found.</div>;

  return (
    <div style={{ marginTop: 24 }}>
      <div style={{
        background: '#fff',
        borderRadius: 10,
        boxShadow: '0 1px 4px 0 rgba(0,0,0,0.03)',
        marginBottom: 20,
        padding: '1.2rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: 6
      }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8, color: '#222' }}>{post.title}</h2>
        <div style={{ fontSize: 15, color: '#555', marginBottom: 10 }}>{post.content}</div>
        <div style={{ display: 'flex', gap: 16, fontSize: 14, color: '#aaa', alignItems: 'center' }}>
          <span>▲ {post.votes_count}</span>
          <button onClick={() => handleVote(1)} disabled={voted === 1} style={{
            background: voted === 1 ? '#e0e0e0' : '#f5f6fa',
            border: '1px solid #e0e0e0',
            borderRadius: 8,
            padding: '0.3rem 0.8rem',
            fontSize: 15,
            color: '#222',
            fontWeight: 500,
            cursor: voted === 1 ? 'not-allowed' : 'pointer',
            opacity: voted === 1 ? 0.6 : 1
          }}>Upvote</button>
          <button onClick={() => handleVote(-1)} disabled={voted === -1} style={{
            background: voted === -1 ? '#e0e0e0' : '#f5f6fa',
            border: '1px solid #e0e0e0',
            borderRadius: 8,
            padding: '0.3rem 0.8rem',
            fontSize: 15,
            color: '#222',
            fontWeight: 500,
            cursor: voted === -1 ? 'not-allowed' : 'pointer',
            opacity: voted === -1 ? 0.6 : 1
          }}>Downvote</button>
        </div>
      </div>
      <div style={{ marginBottom: 24, fontWeight: 500, color: '#222' }}>{comments.length} Comments</div>
      <form onSubmit={handleComment} style={{
        background: '#fff',
        borderRadius: 10,
        boxShadow: '0 1px 4px 0 rgba(0,0,0,0.03)',
        padding: '1.2rem 1.5rem',
        marginBottom: 28,
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }}>
        {replyTo && <div style={{ color: '#888', fontSize: 14 }}>Replying to comment #{replyTo} <button type="button" onClick={() => setReplyTo(null)} style={{ color: '#d33', background: 'none', border: 'none', cursor: 'pointer', marginLeft: 8 }}>Cancel</button></div>}
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder={replyTo ? "Write a reply..." : "Write a comment..."}
          rows={2}
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
        }}>{replyTo ? 'Reply' : 'Comment'}</button>
      </form>
      <CommentTree comments={comments} parentId={null} onReply={handleReply} />
    </div>
  );
} 