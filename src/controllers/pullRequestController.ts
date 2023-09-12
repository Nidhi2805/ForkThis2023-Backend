import {Request, Response, NextFunction } from 'express';
import  catchAsync  from '../managers/catchAsync';

export const ClosedPRController = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body);
        return res.status(200);
})