import express from 'express';
import { createInquiry, getInquiries, inquiryRules } from '../controllers/inquiryController.js';
import { adminOnly, protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

router.post('/', inquiryRules, validate, createInquiry);
router.get('/', protect, adminOnly, getInquiries);

export default router;
