import Review from "../models/review.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

// @route   GET /realSilver/reviews
// @desc    Get all reviews
// @access  Public
export const getAllReviews = catchAsync(async (req, res, next) => {
    const reviews = await Review.find()
        .populate('product', 'name slug images')
        .sort('-createdAt');

    res.status(200).json({
        success: true,
        results: reviews.length,
        data: {
            reviews
        }
    });
});


// @route   GET /realSilver/reviews/product/:productId
// @desc    Get reviews by product ID
// @access  Public
export const getReviewsByProduct = catchAsync(async (req, res, next) => {
    const { productId } = req.params;

    const reviews = await Review.find({ product: productId })
        .sort('-createdAt');

    res.status(200).json({
        success: true,
        results: reviews.length,
        data: {
            reviews
        }
    });
});


// @route   GET /realSilver/reviews/:id
// @desc    Get review by ID
// @access  Public
export const getReviewById = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const review = await Review.findById(id).populate('product', 'name slug images');

    if (!review) {
        return next(new AppError('Review not found', 404));
    }

    res.status(200).json({
        success: true,
        data: {
            review
        }
    });
});


// @route   POST /realSilver/reviews
// @desc    Create a new review
// @access  Public
export const createReview = catchAsync(async (req, res, next) => {
    const review = await Review.create(req.body);

    res.status(201).json({
        success: true,
        data: {
            review
        }
    });
});


// @route   PUT /realSilver/reviews/:id
// @desc    Update a review
// @access  Private/Admin
export const updateReview = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const review = await Review.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    });

    if (!review) {
        return next(new AppError('Review not found', 404));
    }

    res.status(200).json({
        success: true,
        data: {
            review
        }
    });
});


// @route   DELETE /realSilver/reviews/:id
// @desc    Delete a review
// @access  Private/Admin
export const deleteReview = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const review = await Review.findByIdAndDelete(id);

    if (!review) {
        return next(new AppError('Review not found', 404));
    }

    res.status(204).json({
        success: true,
        data: null
    });
});
