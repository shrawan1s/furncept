import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

// Define the validation schema using Yup
const forgotPasswordSchema = yup.object().shape({
    email: yup.string().email().required('Email is required')
});

// Define the validation schema using Yup
const resetPasswordSchema = yup.object().shape({
    resetToken: yup.string().required('Reset token is required'), // Fixed message
    newPassword: yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(100, "Password must be at most 100 characters")
});

// Middleware to validate the request body against the schema
export const validateForgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await forgotPasswordSchema.validate(req.body);
        next();
    } catch (error: any) {
        res.status(400).json({ success: false, errors: error.errors }); // Structured error response
    }
};

// Middleware to validate the request body against the schema
export const validateResetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await resetPasswordSchema.validate(req.body);
        next();
    } catch (error: any) {
        res.status(400).json({ success: false, errors: error.errors }); // Structured error response
    }
};
