import Enquiry from "../models/enquiry.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

// @route   POST /realSilver/enquiries
// @desc    Create a new enquiry
// @access  Public
export const createEnquiry = catchAsync(async (req, res, next) => {
    const { name, email, message, productId } = req.body;

    // Explicit validations with messages
    if (!name) {
        return next(new AppError("Name is required", 400));
    }

    if (!email) {
        return next(new AppError("Email is required", 400));
    }

    if (!message) {
        return next(new AppError("Message is required", 400));
    }

    if (!productId) {
        return next(new AppError("Product ID is required", 400));
    }
    
    const enquiry = await Enquiry.create({
        name,
        email,
        message,
        productId,
    });

    res.status(201).json({
        success: true,
        message: "Enquiry submitted successfully",
        data: {
            enquiry,
        },
    });
});



// @route   GET /realSilver/enquiries
// @desc    Get all enquiries
// @access  Private/Admin
export const getAllEnquiries = catchAsync(async (req, res, next) => {
    const enquiries = await Enquiry.find()
        .populate('productId', 'name slug')
        .sort('-createdAt');

    res.status(200).json({
        success: true,
        results: enquiries.length,
        data: {
            enquiries
        }
    });
});


// @route   GET /realSilver/enquiries/:id
// @desc    Get enquiry by ID
// @access  Private/Admin
export const getEnquiryById = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const enquiry = await Enquiry.findById(id).populate('productId', 'name slug images');

    if (!enquiry) {
        return next(new AppError('Enquiry not found', 404));
    }

    res.status(200).json({
        success: true,
        data: {
            enquiry
        }
    });
});


// @route   DELETE /realSilver/enquiries/:id
// @desc    Delete an enquiry
// @access  Private/Admin
export const deleteEnquiry = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const enquiry = await Enquiry.findByIdAndDelete(id);

    if (!enquiry) {
        return next(new AppError('Enquiry not found', 404));
    }

    res.status(204).json({
        success: true,
        data: null
    });
});
