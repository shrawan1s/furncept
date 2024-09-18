import { Request, Response, Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { UserDocument } from '../model/userSchema';
import { sendPasswordResetEmail } from '../utils/email';
import dotenv from 'dotenv';
import { AuthenticatedRequest } from '../middleware/userMiddleware';

dotenv.config();

const JWT_SECRET: string = process.env.JWT_SECRET!;
const router: Router = Router();

const generateAuthToken = (userId: string) => {
    return jwt.sign({ user: { id: userId } }, JWT_SECRET);
};

export const createUser = async (req: Request<{}, {}, { firstName: string, lastName: string, email: string, password: string }>, res: Response) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(409).json({ success: false, error: "Email already exists" });

        // Hash the password before saving the user
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ firstName, lastName, email, password: hashedPassword });

        // Save the user
        await user.save();

        res.status(201).json({ success: true, authToken: generateAuthToken(user.id), message: "User created successfully", user: { firstName: user.firstName, lastName: user.lastName, email: user.email } });
    } catch (error: any) {
        console.error("Error creating user:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

export const login = async (req: Request<{}, {}, { email: string, password: string }>, res: Response) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ success: false, error: "Invalid email or password" });

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ success: false, error: "Invalid email or password" });

        res.status(200).json({ success: true, authToken: generateAuthToken(user.id), message: "Login successful", user: { firstName: user.firstName, lastName: user.lastName, email: user.email } });
    } catch (error: any) {
        console.error("Error logging in:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

export const getUser = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user!.id;

        // Fetch user without password
        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ success: false, error: "User not found" });

        res.status(200).json({ success: true, token: generateAuthToken(user.id), user: { firstName: user.firstName, lastName: user.lastName, email: user.email } });
    } catch (error: any) {
        console.error("Error fetching user:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

export const forgotPassword = async (req: Request<{}, {}, { email: string }>, res: Response) => {
    try {
        const { email } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ success: false, error: "User not found" });

        // Create reset token
        const resetToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        user.resetToken = resetToken;
        user.resetTokenExpiresAt = new Date(Date.now() + 3600000); // 1 hour

        // Save the reset token to the user document
        await user.save();

        // Send password reset email
        await sendPasswordResetEmail(email, resetToken);

        res.status(200).json({ success: true, message: "Password reset email sent" });
    } catch (error: any) {
        console.error("Error in forgot password:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

export const resetPassword = async (req: Request<{}, {}, { resetToken: string, newPassword: string }>, res: Response) => {
    try {
        const { resetToken, newPassword } = req.body;

        // Verify the reset token
        const decoded = jwt.verify(resetToken, JWT_SECRET) as { userId: string };
        const user = await User.findOne({ _id: decoded.userId, resetToken });

        if (!user) {
            return res.status(404).json({ success: false, error: "Invalid or expired reset token" });
        }

        // Check if reset token has expired
        if (user.resetTokenExpiresAt && user.resetTokenExpiresAt < new Date()) {
            return res.status(400).json({ success: false, error: "Reset token has expired" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user password and clear reset token fields
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiresAt = undefined;

        await user.save();

        res.status(200).json({ success: true, message: "Password reset successfully" });
    } catch (error: any) {
        console.error("Error resetting password:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

export default router;