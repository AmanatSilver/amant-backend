import jwt from 'jsonwebtoken';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

// Middleware to verify admin token (after login)
export const verifyAdminToken = catchAsync(async (req, res, next) => {
    let token;

    // 1️⃣ Get token from header OR cookie
    if (req.headers.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return next(new AppError('Admin authentication required', 401));
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return next(new AppError('Invalid or expired token', 401));
    }

    // 2️⃣ Admin check
    if (!decoded.isAdmin || decoded.type !== 'admin') {
        return next(
            new AppError('Access denied. Admin privileges required.', 403)
        );
    }

    // 3️⃣ Attach user info
    req.user = decoded;
    req.isAdmin = true;

    next();
});



