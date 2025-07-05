-- Communities
CREATE TABLE communities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

-- Posts
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  community_id INTEGER REFERENCES communities(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  votes_count INTEGER DEFAULT 0
);

-- Comments (nested)
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  parent_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  votes_count INTEGER DEFAULT 0
);

-- Votes (for posts and comments)
CREATE TABLE votes (
  id SERIAL PRIMARY KEY,
  target_type VARCHAR(10) NOT NULL CHECK (target_type IN ('post', 'comment')),
  target_id INTEGER NOT NULL,
  session_id VARCHAR(64) NOT NULL,
  value INTEGER NOT NULL CHECK (value IN (1, -1)),
  UNIQUE(target_type, target_id, session_id)
); 