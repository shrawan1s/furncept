import { Request, Response, NextFunction, RequestHandler } from 'express';
import * as yup from 'yup';
import jwt from 'jsonwebtoken';

// Define the validation schema using Yup
const createUserSchema = yup.object().shape({
    firstName: yup.string()
        .required('First name is required')
        .min(3, 'First name must be at least 3 characters')
        .max(30, "First name must be at most 30 characters"),
    lastName: yup.string()
        .required('Last name is required')
        .min(3, 'Last name must be at least 3 characters')
        .max(30, "Last name must be at most 30 characters"),
    email: yup.string().email().required('Email is required'),
    password: yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(100, "Password must be at most 100 characters")
});

// Define the validation schema using Yup
const LoginUserSchema = yup.object().shape({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
});

// Middleware to validate the request body against the schema
export const validateCreateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await createUserSchema.validate(req.body);
        next();
    } catch (error: any) {
        res.status(400).json({ success: false, errors: error.errors });
    }
};

// Middleware to validate the request body against the schema
export const validateLoginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await LoginUserSchema.validate(req.body);
        next();
    } catch (error: any) {
        res.status(400).json({ success: false, errors: error.errors });
    }
};

// Define the type for AuthenticatedRequest
export type AuthenticatedRequest = Request & {
    user?: { id: string };
}

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

export const fetchUser: RequestHandler = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Authentication token is missing or invalid" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { user: { id: string } };
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ error: "Please authenticate using a valid token" });
    }
};
