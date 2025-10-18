import { AuthRequest } from '../middleware/auth';
import Comment from '../models/Comment';
import Post from '../models/Post';
import { Request, Response } from 'express';

export const addComment = async (req: AuthRequest, res: Response) => {
  const { postId, body } = req.body;
  if (!req.userId) return res.status(401).json({ message: 'Unauthorized' });
  const post = await Post.findById(postId);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  const comment = await Comment.create({ post: postId, author: req.userId, body });
  res.status(201).json(comment);
};

export const getCommentsForPost = async (req: Request, res: Response) => {
  const postId = req.params.postId;
  const comments = await Comment.find({ post: postId }).populate('author', 'username').sort({ createdAt: 1 });
  res.json(comments);
};
