import catchAsync from "../managers/catchAsync.js";
import envHandler from "../managers/envHandler.js";
import jwt from 'jsonwebtoken';
import { UserInterface } from "../models/userModel.js";
import { NextFunction, Request,Response } from "express";

interface AuthenticatedRequest extends Request {
    user?:UserInterface;
}

export const callbackAuthController = catchAsync(
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        const token: string = jwt.sign({id: req.user.id}, envHandler("JWT_KEY"), {expiresIn: 60 * 60 * 24 * 10})
        res.redirect(`${envHandler("FRONTEND_URL")}/redirect?token=${token}`);
})  

export const failureAuthController = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        res.redirect(`${envHandler("FRONTEND_URL")}/`);
})