import catchAsync from "../managers/catchAsync.js";
import { Request, Response, NextFunction } from 'express';
import envHandler from "../managers/envHandler.js";
import User from "../models/userModel.js";

export const adminGetUserController = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const {auth, username}:{auth:string, username:string} = req.body;
        if (auth !== envHandler("GENERATOR_SECRET")){
            return res.status(401).json({
                status: "fail",
                message: "Unauthorized"
            })
        }
        const existingUser = await User.findOne({githubUsername: username});
        if(!existingUser){
            return res.status(404).json({
                status: "fail",
                message: "User not found"
            })
        }
        return res.status(200).json({userdata: existingUser})
    })