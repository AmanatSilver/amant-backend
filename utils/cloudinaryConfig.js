import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Cloudinary Storage for Multer
const storageOriginal = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'realSilver/products',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp']
        // No transformation - images stored exactly as uploaded
    }
});

// Base multer upload configuration
const upload = multer({
    storage: storageOriginal,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB max file size per image 
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG, PNG and WebP are allowed.'), false);
        }
    }
});

// Middleware wrapper for multiple product images with error handling
export const uploadProductImages = (req, res, next) => {
    upload.array('images', 10)(req, res, (err) => {
        if (err) {
            if (err instanceof multer.MulterError) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return next(new Error('File size exceeds 10MB limit.'));
                }
                if (err.code === 'LIMIT_FILE_COUNT') {
                    return next(new Error('Cannot upload more than 10 images.'));
                }
                if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                    return next(new Error('Unexpected field name. Use "images" for file uploads.'));
                }
                return next(new Error(`Upload error: ${err.message}`));
            }
            return next(err);
        }
        next();
    });
}

// Helper function to delete image from Cloudinary
export const deleteImage = async (imageUrl) => {
    try {
        // Extract public_id from Cloudinary URL
        const publicId = imageUrl
            .split('/')
            .slice(-2)
            .join('/')
            .split('.')[0];
        
        await cloudinary.uploader.destroy(publicId);
        return true;
    } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        return false;
    }
};

// Helper function to delete multiple images
export const deleteMultipleImages = async (imageUrls) => {
    try {
        const deletePromises = imageUrls.map(url => deleteImage(url));
        await Promise.all(deletePromises);
        return true;
    } catch (error) {
        console.error('Error deleting images from Cloudinary:', error);
        return false;
    }
};

export default cloudinary;