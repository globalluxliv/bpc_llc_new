import express from 'express';
import { getReviews } from '../controllers/review.controller.js';

const router = express.Router();

router.get('/get', getReviews);

export default router;