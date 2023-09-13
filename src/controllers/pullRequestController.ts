import {Request, Response, NextFunction } from 'express';
import  catchAsync  from '../managers/catchAsync.js';
import envHandler from '../managers/envHandler.js';
import User from '../models/userModel.js';
import axios from 'axios';
import Issue from '../models/issueModel.js';
import { GitHubIssue } from '../types/githubIssue.js';

export const ClosedPRController = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const auth = req.headers.authorization;
        const {username, issue_tags, issue_url, pr_url} = req.body;
        if (auth !== envHandler("GITHUB_WORKFLOW_SECRET")){
            return res.status(401).json({"success":false, "message":"Unauthorized"});
        }
        const user = await User.findOne({username: username})
        if (!user){
            return res.status(404).json({"success":false, "message":"User not found"});
        }

        const issuedata: GitHubIssue = await axios.get(issue_url);

        console.log(issuedata)
        console.log(pr_url)
        const issuePayload = {
            repourl: issuedata.repository_url
        }
        return res.status(200).json({"success":true});
})