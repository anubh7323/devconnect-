import { Request, Response } from 'express';
import Post from '../models/Post';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';

export const createPost = async (req: AuthRequest, res: Response) => {
  const { title, body } = req.body;
  if (!req.userId) return res.status(401).json({ message: 'Unauthorized' });
  const post = await Post.create({ title, body, author: req.userId });
  res.status(201).json(post);
};

export const getPosts = async (req: Request, res: Response) => {
  const posts = await Post.find().populate('author', 'username').sort({ createdAt: -1 });
  res.json(posts);
};

export const getPost = async (req: Request, res: Response) => {
  const post = await Post.findById(req.params.id).populate('author', 'username');
  if (!post) return res.status(404).json({ message: 'Not found' });
  res.json(post);
};

export const toggleUpvote = async (req: AuthRequest, res: Response) => {
  if (!req.userId) return res.status(401).json({ message: 'Unauthorized' });
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Not found' });
  const idx = post.upvotes.findIndex((u) => u.toString() === req.userId);
  if (idx === -1) {
    post.upvotes.push(req.userId as any);
  } else {
    post.upvotes.splice(idx, 1);
  }
  await post.save();
  res.json(post);
};

export const deletePost = async (req: AuthRequest, res: Response) => {
  if (!req.userId) return res.status(401).json({ message: 'Unauthorized' });
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Not found' });
  if (post.author.toString() !== req.userId) return res.status(403).json({ message: 'Forbidden' });
  await post.remove();
  res.json({ message: 'Deleted' });
};
