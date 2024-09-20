import { Router } from 'express';
import { validateCreateUser, validateLoginUser, fetchUser } from '../middleware/userMiddleware';
import { validateForgotPassword, validateResetPassword } from '../middleware/passwordMiddleware';
import { createUser, login, getUser, forgotPassword, resetPassword } from '../controllers/authController';

const router = Router();

// User creation
router.post('/createuser', validateCreateUser, createUser);

// User login
router.post('/login', validateLoginUser, login);

// Get user details
router.get('/getUser', fetchUser, getUser);

// Forgot password
router.post('/forgotpassword', validateForgotPassword, forgotPassword);

// Reset password
router.post('/resetpassword', validateResetPassword, resetPassword);

export default router;
