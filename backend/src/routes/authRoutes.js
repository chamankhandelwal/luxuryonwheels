import express from 'express';
import { login, loginRules, me } from '../controllers/authController.js';
import { adminOnly, protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

router.post('/login', loginRules, validate, login);
router.get('/me', protect, adminOnly, me);

export default router;
