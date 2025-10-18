import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPost, fetchComments, addComment, toggleUpvote } from '../api/posts';
import { AuthContext } from '../context/AuthContext';

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<any | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [text, setText] = useState('');
  const { user } = useContext(AuthContext);

  const load = async () => {
    if (!id) return;
    const res = await fetchPost(id);
    setPost(res.data);
    const c = await fetchComments(id);
    setComments(c.data);
  };

  useEffect(() => { load(); }, [id]);

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert('Login required');
    await addComment({ postId: id!, body: text });
    setText('');
    load();
  };

  const handleUpvote = async () => {
    if (!user) return alert('Login required');
    await toggleUpvote(id!);
    load();
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <p className="text-sm text-gray-500">by {post.author?.username}</p>
        <div className="mt-4">{post.body}</div>
        <div className="mt-4">
          <button className="px-3 py-1 border rounded" onClick={handleUpvote}>▲ {post.upvotes?.length || 0}</button>
        </div>
      </div>

      <section className="mt-6">
        <h3 className="font-semibold">Comments</h3>
        <div className="space-y-2 mt-2">
          {comments.map((c) => (
            <div key={c._id} className="bg-white p-3 rounded shadow-sm">
              <p className="text-sm text-gray-600">{c.author?.username}</p>
              <p>{c.body}</p>
            </div>
          ))}
        </div>

        <form onSubmit={submitComment} className="mt-4">
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} className="p-2 w-full border rounded" />
          <button className="mt-2 bg-blue-600 text-white p-2 rounded">Comment</button>
        </form>
      </section>
    </div>
  );
}
