import express from 'express';
import { adminLogin } from '../controllers/adminAuthController.js';
import {verifyAdminToken} from '../middleware/adminAuth.js';
import { createProduct ,updateProduct , addToNewArrivals , deleteProduct} from '../controllers/productController.js';
import { createCollection, updateCollection, deleteCollection } from '../controllers/collectionController.js';
import { getAllEnquiries, deleteEnquiry , getEnquiryById } from '../controllers/enquiryController.js';
import { updateReview, deleteReview } from '../controllers/reviewController.js';    

const router = express.Router();

/**
 * Admin Authentication Flow:
 * 
 * 1. Admin enters admin key on login page
 * 2. Backend verifies key and returns JWT token
 * 3. Frontend stores token (localStorage/sessionStorage)
 * 4. All subsequent admin requests use this token
 * 
 * Token is valid for 1 hour
*/


// @route   POST /realSilver/login
// @desc    Verify admin key and return admin token
// @access  Public
router.post('/login', adminLogin);

router.use(verifyAdminToken);

//--------------------------------------------- Product Routes ---------------------------------------------//

// @route   POST /realSilver/products
// @desc    Create a new product
// @access  Private/Admin
router.post('/products', createProduct);    

// @route   PATCH /realSilver/products/:id
// @desc    Update a product
// @access  Private/Admin
router.patch('/products/:id', updateProduct);

// @route   PATCH /realSilver/products/add-to-new-arrivals/:id
// @desc    Add product to new arrivals
// @access  Private/Admin
router.patch('/products/add-to-new-arrivals/:id', addToNewArrivals);

// @route   DELETE /realSilver/products/:id
// @desc    Delete a product
// @access  Private/Admin
router.delete('/products/:id', deleteProduct);

//--------------------------------------------- Collection Routes ---------------------------------------------//

// @route   POST /realSilver/collections
// @desc    Create a new collection
// @access  Private/Admin
router.post('/collections', createCollection);

// @route   PATCH /realSilver/collections/:id
// @desc    Update a collection
// @access  Private/Admin
router.patch('/collections/:id', updateCollection);

// @route   DELETE /realSilver/collections/:id
// @desc    Delete a collection
// @access  Private/Admin
router.delete('/collections/:id', deleteCollection);

//--------------------------------------------- Enquiry Routes ---------------------------------------------//

// @route   GET /realSilver/enquiries
// @desc    Get all enquiries
// @access  Private/Admin
router.get('/enquiries', getAllEnquiries);

// @route   DELETE /realSilver/enquiries/:id
// @desc    Delete an enquiry
// @access  Private/Admin
router.delete('/enquiries/:id', deleteEnquiry);

// @route   GET /realSilver/enquiries/:id
// @desc    Get enquiry by ID
// @access  Private/Admin
router.get('/enquiries/:id', getEnquiryById);

//--------------------------------------------- Review Routes ---------------------------------------------//

// @route   PATCH /realSilver/reviews/:id
// @desc    Update a review
// @access  Private/Admin
router.patch('/reviews/:id', updateReview);

// @route   DELETE /realSilver/reviews/:id
// @desc    Delete a review
// @access  Private/Admin
router.delete('/reviews/:id', deleteReview);

export default router;