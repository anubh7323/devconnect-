import API from './apiClient';

export const fetchPosts = () => API.get('/posts');
export const fetchPost = (id: string) => API.get(`/posts/${id}`);
export const createPost = (payload: { title: string; body: string }) => API.post('/posts', payload);
export const toggleUpvote = (id: string) => API.post(`/posts/${id}/upvote`);
export const deletePost = (id: string) => API.delete(`/posts/${id}`);
export const addComment = (payload: { postId: string; body: string }) => API.post('/comments', payload);
export const fetchComments = (postId: string) => API.get(`/comments/post/${postId}`);
