import express from 'express';
import { webhookController } from '../controllers/webhookController.js';

const webhook = express.Router();

webhook.post('/', webhookController);

export default webhook;