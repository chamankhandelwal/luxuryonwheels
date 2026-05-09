import { body } from 'express-validator';
import Inquiry from '../models/Inquiry.js';

const memoryInquiries = [];

export const inquiryRules = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('phone').trim().isLength({ min: 8 }).withMessage('Phone is required'),
  body('email').optional({ values: 'falsy' }).isEmail(),
  body('message').trim().notEmpty().withMessage('Message is required')
];

export const createInquiry = async (req, res, next) => {
  try {
    if (Inquiry.db.readyState !== 1) {
      const inquiry = { ...req.body, _id: `lead-${Date.now()}`, createdAt: new Date() };
      memoryInquiries.unshift(inquiry);
      return res.status(201).json({ success: true, inquiry });
    }

    const inquiry = await Inquiry.create(req.body);
    res.status(201).json({ success: true, inquiry });
  } catch (error) {
    next(error);
  }
};

export const getInquiries = async (req, res, next) => {
  try {
    if (Inquiry.db.readyState !== 1) return res.json({ success: true, inquiries: memoryInquiries });
    const inquiries = await Inquiry.find().populate('car', 'name brand model year').sort('-createdAt');
    res.json({ success: true, inquiries });
  } catch (error) {
    next(error);
  }
};
