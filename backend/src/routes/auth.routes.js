import express from 'express';
import { login, logout, register,updateProfile ,checkAuth} from '../controllers/auth.controller.js';
import { protectMiddleware } from '../middlewares/protectMiddleware.js';

const router = express.Router();

// Define your authentication routes here
router.post('/login', login);
router.post('/register', register); 
router.post('/logout', logout); 
router.get('/check-auth', protectMiddleware, checkAuth);
router.put('/update-profile', protectMiddleware, updateProfile);

export default router;