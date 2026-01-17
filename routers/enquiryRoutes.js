import express from 'express';
import {
    createEnquiry,
} from '../controllers/enquiryController.js';

const router = express.Router();

// @route   POST /realSilver/enquiries
// @desc    Create a new enquiry
// @access  Public
router.post('/', createEnquiry);


export default router;
