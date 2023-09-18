import catchAsync from "../managers/catchAsync.js";
import User, { UserInterface } from "../models/userModel.js";
import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
    user?:UserInterface;
}

export const getUserController = catchAsync(
    async (req: AuthenticatedRequest, res:Response, next: NextFunction) => {
        // const github = "Jennings.Wolf50";
        // const existinguser:UserInterface = await User.findOne({githubUsername:github})
        const existinguser: UserInterface = await User.findOne({id:req.user.id})
        if(!existinguser){
            return res.status(401).send({ error: "Not Authorized" })
        }
        const issuesSolved:number = existinguser.noOfIssuesSolved || -1;
        existinguser.noOfIssuesSolved = issuesSolved + 1
        const rank = await User.countDocuments({ score: { $gt: existinguser.score } }) + 1;
        const finalUser = {
            githubUsername: existinguser.githubUsername,
            name: existinguser.name,
            score: existinguser.score,
            noOfIssuesSolved: existinguser.noOfIssuesSolved,
            id : existinguser.id,
            rank: rank
        }
        return res.status(200).json(finalUser);
})