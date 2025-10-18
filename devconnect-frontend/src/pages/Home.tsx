import React, { useEffect, useState, useContext } from 'react';
import { fetchPosts, toggleUpvote } from '../api/posts';
import PostCard from '../components/PostCard';
import { AuthContext } from '../context/AuthContext';

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const { user } = useContext(AuthContext);

  const load = async () => {
    try {
      const res = await fetchPosts();
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { load(); }, []);

  const handleUpvote = async (id: string) => {
    if (!user) return alert('Login to upvote');
    await toggleUpvote(id);
    load();
  };

  return (
    <div className="grid gap-4">
      {posts.map((p) => (
        <PostCard key={p._id} post={p} onUpvote={() => handleUpvote(p._id)} />
      ))}
    </div>
  );
}
