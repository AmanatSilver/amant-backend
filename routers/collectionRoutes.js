import express from 'express';
import {
    getAllCollections,
    getCollectionBySlug,
    getCollectionById
} from '../controllers/collectionController.js';

const router = express.Router();

// @route   GET /realSilver/collections
// @desc    Get all collections
// @access  Public
router.get('/', getAllCollections);

// @route   GET /realSilver/collections/:slug
// @desc    Get collection by slug
// @access  Public
router.get('/slug/:slug', getCollectionBySlug);

// @route   GET /realSilver/collections/id/:id
// @desc    Get collection by ID
// @access  Public
router.get('/id/:id', getCollectionById);

export default router;
