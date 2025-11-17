import express from 'express';
import { login, logout, register } from '../controllers/auth.controller.js';

const router = express.Router();

// Define your authentication routes here
router.get('/login', login);
router.post('/register', register); 
router.post('/logout', logout); 

export default router;