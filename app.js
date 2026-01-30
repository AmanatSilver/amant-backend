import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import adminRoutes from "./routers/adminRoutes.js";
import productRoutes from "./routers/productRoutes.js";
import collectionRoutes from "./routers/collectionRoutes.js";
import reviewRoutes from "./routers/reviewRoutes.js";
import enquiryRoutes from "./routers/enquiryRoutes.js";
import globalErrorHandler from './utils/globalErrorHandler.js';
import AppError from './utils/appError.js';


const app = express();

app.use(express.json());
app.use(cookieParser()); // Parse cookies



// CORS configuration
const allowedOrigins = [
    'http://localhost:5173',           // Local Vite
    'http://localhost:3000',           // Local React/Next
    'https://amanatsilver.in/'    
];

// Add FRONTEND_URL if it exists and is different
if (process.env.FRONTEND_URL && !allowedOrigins.includes(process.env.FRONTEND_URL)) {
    allowedOrigins.push(process.env.FRONTEND_URL);
}

console.log('✅ Allowed CORS Origins:', allowedOrigins);

// CORS middleware with function-based origin check
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, Postman, or same-origin)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.includes(origin)) {
            console.log('✅ CORS allowed for origin:', origin);
            callback(null, true);
        } else {
            console.log('❌ CORS blocked for origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true, // Important for cookies
    optionsSuccessStatus: 200 // For legacy browsers
}));






// Print environment
console.log('🔍 NODE_ENV:', process.env.NODE_ENV);

app.get('/api', (req, res) => {
  res.json({'message': 'Hello from Amant backend'});
});

//admin routes
app.use('/api/v1/amanat/realSilver', adminRoutes);

//product routes
app.use('/api/v1/amanat/products', productRoutes);

//collection routes
app.use('/api/v1/amanat/collections', collectionRoutes);

//review routes
app.use('/api/v1/amanat/reviews', reviewRoutes);

//enquiry routes
app.use('/api/v1/amanat/enquiries', enquiryRoutes);

// 404 handler
app.all('/{*any}', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!!`, 404));
});


// Global error handler
app.use(globalErrorHandler);

export { app };