import React from 'react';
import { Link } from 'react-router-dom';

interface Props { post: any; onUpvote?: () => void }

export default function PostCard({ post, onUpvote }: Props) {
  return (
    <article className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold"><Link to={`/posts/${post._id}`}>{post.title}</Link></h3>
          <p className="text-sm text-gray-600">by {post.author?.username}</p>
        </div>
        <div className="text-sm">
          <button onClick={onUpvote} className="px-2 py-1 border rounded">▲ {post.upvotes?.length || 0}</button>
        </div>
      </div>
      <p className="mt-2 text-gray-700">{post.body.slice(0, 240)}{post.body.length > 240 ? '...' : ''}</p>
    </article>
  );
}
