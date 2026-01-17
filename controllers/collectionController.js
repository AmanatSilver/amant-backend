import Collection from "../models/collection.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

// @route   GET /realSilver/collections
// @desc    Get all collections
// @access  Public
export const getAllCollections = catchAsync(async (req, res, next) => {
    const collections = await Collection.find();

    res.status(200).json({
        success: true,
        results: collections.length,
        data: {
            collections
        }
    });
});


// @route   GET /realSilver/collections/:slug
// @desc    Get collection by slug
// @access  Public
export const getCollectionBySlug = catchAsync(async (req, res, next) => {
    const { slug } = req.params;

    const collection = await Collection.findOne({ slug });

    if (!collection) {
        return next(new AppError('Collection not found', 404));
    }

    res.status(200).json({
        success: true,
        data: {
            collection
        }
    });
});


// @route   GET /realSilver/collections/id/:id
// @desc    Get collection by ID
// @access  Public
export const getCollectionById = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const collection = await Collection.findById(id);

    if (!collection) {
        return next(new AppError('Collection not found', 404));
    }

    res.status(200).json({
        success: true,
        data: {
            collection
        }
    });
});


//--------------------------------------------- Admin controllers ---------------------------------------------//

// @route   POST /realSilver/collections
// @desc    Create a new collection
// @access  Private/Admin
export const createCollection = catchAsync(async (req, res, next) => {
    const { name, description, heroImage } = req.body;

    if (!name) {
        return next(new AppError("Name is required", 400));
    }

    if (!description) {
        return next(new AppError("Description is required", 400));
    }

    if (!heroImage) {
        return next(new AppError("Hero image is required", 400));
    }


    const collection = await Collection.create({
        name,
        description,
        heroImage,
    });

    res.status(201).json({
        success: true,
        data: {
            collection,
        },
    });
});


// @route   PATCH /realSilver/collections/:id
// @desc    Update a collection
// @access  Private/Admin
export const updateCollection = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const updates = {};

    // Handle name + slug together
    if (req.body.name) {
        updates.name = req.body.name;
        updates.slug = slugify(req.body.name, {
            lower: true,
            strict: true,
        });
    }

    if (req.body.description) {
        updates.description = req.body.description;
    }

    if (req.body.heroImage) {
        updates.heroImage = req.body.heroImage;
    }

    const collection = await Collection.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
    });

    if (!collection) {
        return next(new AppError("Collection not found", 404));
    }

    res.status(200).json({
        success: true,
        data: {
            collection,
        },
    });
});


// @route   DELETE /realSilver/collections/:id
// @desc    Delete a collection
// @access  Private/Admin
export const deleteCollection = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const collection = await Collection.findByIdAndDelete(id);

    if (!collection) {
        return next(new AppError('Collection not found', 404));
    }

    res.status(204).json({
        success: true,
        data: null
    });
});
