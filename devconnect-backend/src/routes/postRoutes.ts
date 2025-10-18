import { Router } from 'express';
import { createPost, getPosts, getPost, toggleUpvote, deletePost } from '../controllers/postController';
import auth from '../middleware/auth';

const router = Router();
router.get('/', getPosts);
router.post('/', auth, createPost);
router.get('/:id', getPost);
router.post('/:id/upvote', auth, toggleUpvote);
router.delete('/:id', auth, deletePost);
export default router;
