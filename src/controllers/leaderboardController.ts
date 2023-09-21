import catchAsync from "../managers/catchAsync.js";
import {Request, Response, NextFunction } from 'express';
import User from "../models/userModel.js";

export const getLeaderboard = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const {limit, page} = req.query;
        const leaderboard = await User.find().sort({score: -1}).limit(Number(limit)).skip(Number(page));
        const count = await User.countDocuments();
        const leaderboardWithIndex = leaderboard.map((user, index) => ({
            ...user.toObject(),
            rank: index + 1 + (Number(page) * Number(limit)),
          }));
        return res.status(200).json({"count":count, "success":true, "data":leaderboardWithIndex});
});