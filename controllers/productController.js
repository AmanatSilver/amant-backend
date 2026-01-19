import Product from "../models/product.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { deleteMultipleImages } from "./../utils/cloudinaryConfig.js";


// @route   GET /realSilver/products
// @desc    Get all products
// @access  Public
export const getAllProducts = catchAsync(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        results: products.length,
        data: {
            products: products
        }
    });
});


// @route   GET /realSilver/products/:slug
// @desc    Get product by slug
// @access  Public
export const getProductBySlug = catchAsync(async (req, res, next) => {
    const { slug } = req.params;

    const product = await Product.findOne({ slug }).populate('collectionId', 'name slug');

    if (!product) {
        return next(new AppError('Product not found', 404));
    }

    res.status(200).json({
        success: true,
        data: {
            product
        }
    });
});


// @route   GET /realSilver/products/id/:id
// @desc    Get product by ID
// @access  Public
export const getProductById = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const product = await Product.findById(id).populate('collectionId', 'name slug');

    if (!product) {
        return next(new AppError('Product not found', 404));
    }

    res.status(200).json({
        success: true,
        data: {
            product
        }
    });
});


// @route   GET /realSilver/products/collection/:collectionSlug
// @desc    Get products by collection slug
// @access  Public
export const getProductsByCollection = catchAsync(async (req, res, next) => {
    const { collectionSlug } = req.params;

    const products = await Product.find().populate({
        path: 'collectionId',
        match: { slug: collectionSlug }
    });

    const filteredProducts = products.filter(product => product.collectionId !== null);

    res.status(200).json({
        success: true,
        results: filteredProducts.length,
        data: {
            products: filteredProducts
        }
    });
});


// @route   GET /realSilver/products/featured
// @desc    Get featured products
// @access  Public
export const getFeaturedProducts = catchAsync(async (req, res, next) => {
    const products = await Product.find({ featured: true }).populate('collectionId', 'name slug');

    res.status(200).json({
        success: true,
        results: products.length,
        data: {
            products
        }
    });
});


// @route   GET /realSilver/products/new-arrivals
// @desc    Get new arrival products
// @access  Public
export const getNewArrivals = catchAsync(async (req, res, next) => {
    const products = await Product.find({ isNewArrival: true })
        .populate('collectionId', 'name slug')
        .sort('-createdAt')
        .limit(10);

    res.status(200).json({
        success: true,
        results: products.length,
        data: {
            products
        }
    });
});


// @route   POST /realSilver/products
// @desc    Create a new product with images
// @access  Private/Admin
export const createProduct = catchAsync(async (req, res, next) => {
    // Check if images were uploaded
    if (!req.files || req.files.length === 0) {
        return next(new AppError('Please upload at least one product image', 400));
    }

    // Extract image URLs from uploaded files
    const imageUrls = req.files.map(file => file.path);

    // Create product with image URLs
    const productData = {
        ...req.body,
        images: imageUrls
    };

    const product = await Product.create(productData);

    res.status(201).json({
        success: true,
        data: {
            product
        }
    });
});


// @route   PATCH /realSilver/products/:id
// @desc    Update a product
// @access  Private/Admin
export const updateProduct = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    let updateData = { ...req.body };

    // If new images are uploaded, handle old images
    if (req.files && req.files.length > 0) {
        const product = await Product.findById(id);

        if (!product) {
            return next(new AppError('Product not found', 404));
        }

        // Delete old images from Cloudinary
        if (product.images && product.images.length > 0) {
            await deleteMultipleImages(product.images);
        }

        // Add new image URLs
        updateData.images = req.files.map(file => file.path);
    }

    const product = await Product.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true
    });

    if (!product) {
        return next(new AppError('Product not found', 404));
    }

    res.status(200).json({
        success: true,
        data: {
            product
        }
    });
});


// @route   PATCH /realSilver/products/add-to-new-arrivals/:id
// @desc    Add product to new arrivals
// @access  Private/Admin
export const addToNewArrivals = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, { isNewArrival: true }, {
        new: true,
        runValidators: true
    });

    if (!product) {
        return next(new AppError('Product not found', 404));
    }

    res.status(200).json({
        success: true,
        data: {
            product
        }
    });
});


// @route   DELETE /realSilver/products/:id
// @desc    Delete a product
// @access  Private/Admin
export const deleteProduct = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
        return next(new AppError('Product not found', 404));
    }

    // Delete images from Cloudinary
    if (product.images && product.images.length > 0) {
        await deleteMultipleImages(product.images);
    }

    await Product.findByIdAndDelete(id);

    res.status(204).json({
        success: true,
        data: null
    });
});