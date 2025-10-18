import { Router } from 'express';
import { addComment, getCommentsForPost } from '../controllers/commentController';
import auth from '../middleware/auth';

const router = Router();
router.post('/', auth, addComment);
router.get('/post/:postId', getCommentsForPost);
export default router;
