const API = 'https://backend-production-cb33.up.railway.app/api';

export async function getCommunities() {
  const res = await fetch(`${API}/communities`);
  return res.json();
}
export async function createCommunity(name) {
  const res = await fetch(`${API}/communities`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  return res.json();
}
export async function getPosts(community) {
  const url = community ? `${API}/posts?community=${community}` : `${API}/posts`;
  const res = await fetch(url);
  return res.json();
}
export async function createPost(community_id, title, content) {
  const res = await fetch(`${API}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ community_id, title, content })
  });
  return res.json();
}
export async function getPost(id) {
  const res = await fetch(`${API}/posts/${id}`);
  return res.json();
}
export async function getComments(post_id) {
  const res = await fetch(`${API}/posts/${post_id}/comments`);
  return res.json();
}
export async function createComment(post_id, parent_id, content) {
  const res = await fetch(`${API}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ post_id, parent_id, content })
  });
  return res.json();
}
export async function vote(target_type, target_id, session_id, value) {
  const res = await fetch(`${API}/vote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ target_type, target_id, session_id, value })
  });
  return res.json();
}
export async function search(q) {
  const res = await fetch(`${API}/search?q=${encodeURIComponent(q)}`);
  return res.json();
} 