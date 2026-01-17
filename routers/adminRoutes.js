import express from 'express';
import { adminLogin } from '../controllers/adminAuthController.js';
import {verifyAdminToken} from '../middleware/authMiddleware.js';
import { createProduct ,updateProduct , addToNewArrivals , deleteProduct} from '../controllers/productController.js';    

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

export default router;