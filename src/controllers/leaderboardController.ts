import catchAsync from "../managers/catchAsync";
import {Request, Response, NextFunction } from 'express';
import User from "../models/userModel";

export const getLeaderboard = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {

        const {limit, page} = req.query;

        const leaderboard = await User.find().sort({score: -1}).limit(Number(limit)).skip(Number(page));
        
        return res.status(200).json({"success":true, "data":leaderboard});
});

