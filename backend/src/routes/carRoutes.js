import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  carCreateRules,
  carQueryRules,
  carUpdateRules,
  createCar,
  deleteCar,
  getCar,
  getCars,
  toggleSold,
  updateCar,
  uploadImages
} from '../controllers/carController.js';
import { adminOnly, protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`)
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) return cb(new Error('Only image files are allowed'));
    cb(null, true);
  }
});

router.post('/upload', protect, adminOnly, upload.array('images', 8), uploadImages);
router.get('/', carQueryRules, validate, getCars);
router.get('/:id', getCar);
router.post('/', protect, adminOnly, carCreateRules, validate, createCar);
router.put('/:id', protect, adminOnly, carUpdateRules, validate, updateCar);
router.delete('/:id', protect, adminOnly, deleteCar);
router.patch('/:id/sold', protect, adminOnly, toggleSold);

export default router;
