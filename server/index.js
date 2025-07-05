const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
const pool = new Pool();
app.use(cors());
app.use(express.json());

// Communities
app.get('/api/communities', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM communities ORDER BY name');
  res.json(rows);
});
app.post('/api/communities', async (req, res) => {
  const { name } = req.body;
  try {
    const { rows } = await pool.query('INSERT INTO communities (name) VALUES ($1) RETURNING *', [name]);
    res.json(rows[0]);
  } catch (e) {
    res.status(400).json({ error: 'Community name must be unique.' });
  }
});

// Posts
app.get('/api/posts', async (req, res) => {
  const { community } = req.query;
  let q = 'SELECT * FROM posts';
  let params = [];
  if (community) {
    q += ' WHERE community_id = $1';
    params = [community];
  }
  q += ' ORDER BY votes_count DESC, created_at DESC LIMIT 50';
  const { rows } = await pool.query(q, params);
  res.json(rows);
});
app.post('/api/posts', async (req, res) => {
  const { community_id, title, content } = req.body;
  const { rows } = await pool.query('INSERT INTO posts (community_id, title, content) VALUES ($1, $2, $3) RETURNING *', [community_id, title, content]);
  res.json(rows[0]);
});
app.get('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
  res.json(rows[0]);
});

// Comments
app.get('/api/posts/:id/comments', async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query('SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at ASC', [id]);
  res.json(rows);
});
app.post('/api/comments', async (req, res) => {
  const { post_id, parent_id, content } = req.body;
  const { rows } = await pool.query('INSERT INTO comments (post_id, parent_id, content) VALUES ($1, $2, $3) RETURNING *', [post_id, parent_id || null, content]);
  res.json(rows[0]);
});

// Votes
app.post('/api/vote', async (req, res) => {
  const { target_type, target_id, session_id, value } = req.body;
  try {
    await pool.query('INSERT INTO votes (target_type, target_id, session_id, value) VALUES ($1, $2, $3, $4) ON CONFLICT (target_type, target_id, session_id) DO UPDATE SET value = $4', [target_type, target_id, session_id, value]);
    if (target_type === 'post') {
      await pool.query('UPDATE posts SET votes_count = votes_count + $1 WHERE id = $2', [value, target_id]);
    } else {
      await pool.query('UPDATE comments SET votes_count = votes_count + $1 WHERE id = $2', [value, target_id]);
    }
    res.json({ success: true });
  } catch (e) {
    res.status(400).json({ error: 'Invalid vote.' });
  }
});

// Search
app.get('/api/search', async (req, res) => {
  const { q } = req.query;
  const posts = await pool.query('SELECT * FROM posts WHERE title ILIKE $1 OR content ILIKE $1', [`%${q}%`]);
  const communities = await pool.query('SELECT * FROM communities WHERE name ILIKE $1', [`%${q}%`]);
  const comments = await pool.query('SELECT * FROM comments WHERE content ILIKE $1', [`%${q}%`]);
  res.json({ posts: posts.rows, communities: communities.rows, comments: comments.rows });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('Server running on ' + PORT)); 