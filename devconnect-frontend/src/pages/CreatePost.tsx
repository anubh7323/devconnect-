import React, { useState, useContext } from 'react';
import { createPost } from '../api/posts';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const { user } = useContext(AuthContext);
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert('Login required');
    try {
      await createPost({ title, body });
      nav('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create Post</h2>
      <form className="flex flex-col gap-3" onSubmit={submit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="p-2 border rounded" />
        <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={8} placeholder="Body" className="p-2 border rounded" />
        <button className="bg-blue-600 text-white p-2 rounded">Publish</button>
      </form>
    </div>
  );
}
