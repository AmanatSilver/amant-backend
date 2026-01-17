import express from 'express';
import {getAllProducts, getProductBySlug, getProductById , getProductsByCollection ,getFeaturedProducts ,getNewArrivals} from '../controllers/productController.js';

const router = express.Router();

//--------------------------------------------- Product Routes ---------------------------------------------//      

// @route   GET /realSilver/products
// @desc    Get all products
// @access  Public
router.get('/', getAllProducts);    

// @route   GET /realSilver/products/collection/:collectionIdSlug
// @desc    Get products by collection slug
// @access  Public
router.get('/collection/:collectionSlug', getProductsByCollection);

// @route   GET /realSilver/products/featured
// @desc    Get featured products
// @access  Public
router.get('/featured', getFeaturedProducts); 

// @route   GET /realSilver/products/new-arrivals
// @desc    Get new arrivals products
// @access  Public
router.get('/new-arrivals', getNewArrivals);

// @route   GET /realSilver/products/slug/:slug
// @desc    Get product by slug
// @access  Public
router.get('/slug/:slug', getProductBySlug);

// @route   GET /realSilver/products/:id
// @desc    Get product by ID
// @access  Public
router.get('/:id', getProductById);

export default router;