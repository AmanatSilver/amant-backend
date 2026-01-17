import express from 'express';
import {
    getAllReviews,
    getReviewsByProduct,
    getReviewById,
    createReview
} from '../controllers/reviewController.js';

const router = express.Router();

// @route   GET /realSilver/reviews
// @desc    Get all reviews
// @access  Public
router.get('/', getAllReviews);

// @route   GET /realSilver/reviews/product/:productId
// @desc    Get reviews by product ID
// @access  Public
router.get('/product/:productId', getReviewsByProduct);

// @route   GET /realSilver/reviews/:id
// @desc    Get review by ID
// @access  Public
router.get('/:id', getReviewById);

// @route   POST /realSilver/reviews
// @desc    Create a new review
// @access  Public
router.post('/', createReview);

export default router;
