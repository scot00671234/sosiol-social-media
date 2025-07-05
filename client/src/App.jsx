import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Feed from './components/Feed';
import Community from './components/Community';
import Post from './components/Post';
import CreateCommunity from './components/CreateCommunity';
import SearchBar from './components/SearchBar';

const Header = () => (
  <header style={{
    fontFamily: 'Inter, system-ui, sans-serif',
    background: '#fff',
    borderBottom: '1px solid #eee',
    padding: '1.5rem 0',
    marginBottom: '2rem',
    textAlign: 'center',
    letterSpacing: '0.05em',
    fontWeight: 600,
    fontSize: '2rem',
    color: '#222',
    boxShadow: '0 2px 8px 0 rgba(0,0,0,0.01)'
  }}>
    <Link to="/" style={{ textDecoration: 'none', color: '#222' }}>Sosiol</Link>
  </header>
);

function App() {
  return (
    <Router>
      <div style={{
        minHeight: '100vh',
        background: '#fafbfc',
        fontFamily: 'Inter, system-ui, sans-serif',
        color: '#222',
      }}>
        <Header />
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 1rem' }}>
          <SearchBar />
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/c/:communityId" element={<Community />} />
            <Route path="/post/:postId" element={<Post />} />
            <Route path="/create-community" element={<CreateCommunity />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App; 