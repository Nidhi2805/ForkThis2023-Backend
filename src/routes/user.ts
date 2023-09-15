import express from 'express';
import { getUserController } from '../controllers/userController.js';
import { protect } from '../middleware/protect.js';

const user = express.Router();

user.get('/', protect, getUserController);

export default user;