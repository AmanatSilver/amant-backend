import express from 'express';
import { adminLogin } from '../controllers/adminAuthController.js';

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

export default router;