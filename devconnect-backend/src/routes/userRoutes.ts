import { Router } from 'express';
import { Request, Response } from 'express';
import auth from '../middleware/auth';
import User from '../models/User';

const router = Router();

router.get('/me', auth, async (req: any, res: Response) => {
  const user = await User.findById(req.userId).select('-password');
  res.json(user);
});

export default router;
