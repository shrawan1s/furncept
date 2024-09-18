import { Router } from 'express';
import { validateCreateUser, validateLoginUser, fetchUser } from '../middleware/userMiddleware';
import { validateForgotPassword, validateResetPassword } from '../middleware/passwordMiddleware';
import { createUser, login, getUser, forgotPassword, resetPassword } from '../controllers/authController';

const router = Router();

router.post('/createuser', validateCreateUser, createUser);
router.post('/login', validateLoginUser, login);
router.get('/getUser', fetchUser, getUser);
router.post('/forgotpassword', validateForgotPassword, forgotPassword);
router.post('/resetpassword', validateResetPassword, resetPassword);

export default router;
