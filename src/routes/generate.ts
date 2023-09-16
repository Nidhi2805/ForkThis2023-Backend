import express from 'express';
import { generateController } from '../controllers/generateController.js';

const generate = express.Router();

generate.post('/', generateController);

export default generate;