import HomepageContent from "../models/homePage.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

// @route   GET /realSilver/homepage
// @desc    Get homepage content
// @access  Public
export const getHomepageContent = catchAsync(async (req, res, next) => {
    // Assuming there's only one homepage content document
    const homepage = await HomepageContent.findOne();

    if (!homepage) {
        return next(new AppError('Homepage content not found', 404));
    }

    res.status(200).json({
        success: true,
        data: {
            homepage
        }
    });
});


// @route   POST /realSilver/homepage
// @desc    Create homepage content
// @access  Private/Admin
export const createHomepageContent = catchAsync(async (req, res, next) => {
    // Check if homepage content already exists
    const existingHomepage = await HomepageContent.findOne();

    if (existingHomepage) {
        return next(new AppError('Homepage content already exists. Use update instead.', 400));
    }

    const homepage = await HomepageContent.create(req.body);

    res.status(201).json({
        success: true,
        data: {
            homepage
        }
    });
});


// @route   PATCH /realSilver/homepage/:id
// @desc    Update homepage content
// @access  Private/Admin
export const updateHomepageContent = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const homepage = await HomepageContent.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    });

    if (!homepage) {
        return next(new AppError('Homepage content not found', 404));
    }

    res.status(200).json({
        success: true,
        data: {
            homepage
        }
    });
});


// @route   PATCH /realSilver/homepage
// @desc    Update homepage content (without ID - finds the first one)
// @access  Private/Admin
export const updateHomepage = catchAsync(async (req, res, next) => {
    const homepage = await HomepageContent.findOne();

    if (!homepage) {
        return next(new AppError('Homepage content not found. Create it first.', 404));
    }

    const updatedHomepage = await HomepageContent.findByIdAndUpdate(
        homepage._id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    res.status(200).json({
        success: true,
        data: {
            homepage: updatedHomepage
        }
    });
});
