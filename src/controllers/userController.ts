import catchAsync from "../managers/catchAsync.js";
import User, { UserInterface } from "../models/userModel.js";
import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
    user?:UserInterface;
}

export const getUserController = catchAsync(
    async (req: AuthenticatedRequest, res:Response, next: NextFunction) => {
        const existinguser: UserInterface = await User.findOne({id:req.user.id})
        if(!existinguser){
            return res.status(401).send({ error: "Not Authorized" })
        }
        const issuesSolved:number = existinguser.noOfIssuesSolved || -1;
        existinguser.noOfIssuesSolved = issuesSolved + 1
        return res.status(200).json(existinguser);
})