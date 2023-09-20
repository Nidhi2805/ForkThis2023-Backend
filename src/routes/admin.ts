import express from 'express';
import { adminGetUserController } from '../controllers/adminController.js';

const admin = express.Router();

admin.post('/user', adminGetUserController);

export default admin;