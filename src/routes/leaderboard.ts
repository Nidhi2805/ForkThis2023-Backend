import express from 'express';
import { ClosedPRController } from '../controllers/pullRequestController.js';
import { getLeaderboard } from '../controllers/leaderboardController.js';

const leaderboard = express.Router();

leaderboard.get('/', getLeaderboard);

export default leaderboard;