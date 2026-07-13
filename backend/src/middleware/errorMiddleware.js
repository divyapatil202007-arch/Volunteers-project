import { logger } from '../config/logger.js';

export const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, _next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Handle Prisma Known Request Error
  if (err.code === 'P2002') {
    statusCode = 400;
    message = `Duplicate field value entered`;
  }
  
  if (err.code === 'P2025') {
    statusCode = 404;
    message = 'Resource not found';
  }

  // Log error in development/production via Winston
  logger.error(`${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
