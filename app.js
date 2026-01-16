import express from 'express';
import cookieParser from 'cookie-parser';
import adminRoutes from "./routers/adminRoutes.js";
import globalErrorHandler from './utils/globalErrorHandler.js';
import AppError from './utils/appError.js';


const app = express();

app.use(express.json());
app.use(cookieParser()); // Parse cookies

// Print environment
console.log('🔍 NODE_ENV:', process.env.NODE_ENV);

app.get('/', (req, res) => {
  res.json({'message': 'Hello from Amant backend'});
});

//admin routes
app.use('/api/v1/amanat/realSilver', adminRoutes);


// 404 handler
app.all('/{*any}', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!!`, 404));
});


// Global error handler
app.use(globalErrorHandler);

export { app };