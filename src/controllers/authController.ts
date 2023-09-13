import catchAsync from "../managers/catchAsync.js";
import {Request, Response, NextFunction } from 'express';

export const ClosedPRController = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body);
})