import { Router } from 'express';
import { fetchUser } from '../middleware/fetchUser';
import { validateCreateUser, validateLoginUser } from '../middleware/userMiddleware';
import { validateForgotPassword, validateResetPassword } from '../middleware/passwordMiddleware';
import { createUser, login, getUser, forgotPassword, resetPassword } from '../controllers/authController';

const router = Router();

router.post('/createuser', validateCreateUser, createUser);
router.post('/login', validateLoginUser, login);
router.post('/getUser', fetchUser, getUser);
router.put('/forgotpassword', validateForgotPassword, forgotPassword);
router.delete('/resetpassword', validateResetPassword, resetPassword);

export default router;
