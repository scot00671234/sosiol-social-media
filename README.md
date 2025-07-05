# Sosiol

A minimalist, anonymous social media platform inspired by Reddit. Built with React, Node.js, and PostgreSQL.

## Features

- **Anonymous posting** - No user accounts required
- **Communities** - Create and join communities
- **Posts & Comments** - Nested comment threads
- **Voting** - Upvote/downvote posts and comments (one per session)
- **Search** - Search posts, communities, and comments
- **Minimalist UI** - Clean, modern design with light colors

## Local Development

### Prerequisites
- Node.js 18+
- PostgreSQL

### Backend Setup
```bash
cd server
npm install
```

Set up PostgreSQL database and run the schema:
```sql
-- Copy and run the contents of server/schema.sql
```

Set environment variables (create a `.env` file):
```
DATABASE_URL=postgresql://username:password@localhost:5432/sosiol
PORT=3001
```

Start the backend:
```bash
npm start
```

### Frontend Setup
```bash
cd client
npm install
npm run dev
```

The app will be available at `http://localhost:3000`

## Railway Deployment

1. **Create Railway account** and install Railway CLI
2. **Initialize project:**
   ```bash
   railway login
   railway init
   ```
3. **Add PostgreSQL service:**
   ```bash
   railway add
   # Select PostgreSQL
   ```
4. **Deploy backend:**
   ```bash
   railway up
   ```
5. **Set environment variables** in Railway dashboard:
   - `DATABASE_URL` (auto-set by PostgreSQL service)
   - `PORT` (auto-set by Railway)
6. **Deploy frontend** (separate service):
   ```bash
   cd client
   railway up
   ```

## API Endpoints

- `GET /api/communities` - List all communities
- `POST /api/communities` - Create community
- `GET /api/posts` - List posts (optionally filtered by community)
- `POST /api/posts` - Create post
- `GET /api/posts/:id` - Get specific post
- `GET /api/posts/:id/comments` - Get comments for post
- `POST /api/comments` - Create comment
- `POST /api/vote` - Vote on post or comment
- `GET /api/search` - Search posts, communities, comments

## Tech Stack

- **Frontend:** React 18, React Router, Vite
- **Backend:** Node.js, Express, PostgreSQL
- **Deployment:** Railway, Docker
- **Styling:** Inline styles (minimalist approach)

## License

MIT 