import express from 'express';
import { adminGetUserController, adminUpdateScoreController } from '../controllers/adminController.js';

const admin = express.Router();

admin.post('/user', adminGetUserController);
admin.post('/score', adminUpdateScoreController);

export default admin;