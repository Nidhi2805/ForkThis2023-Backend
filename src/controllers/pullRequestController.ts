import {Request, Response, NextFunction } from 'express';
import  catchAsync  from '../managers/catchAsync.js';
import envHandler from '../managers/envHandler.js';
import User from '../models/userModel.js';
import axios from 'axios';
import Issue from '../models/issueModel.js';
import { GitHubIssue } from '../types/githubIssue.js';
import logger from '../../logs/logger.js';
import { difficultyFind } from '../helpers/difficultyFind.js';
import PR from '../models/prModel.js';

export const ClosedPRController = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const auth = req.headers.authorization;
        const {username, issue_tags, issue_url, pr_url} = req.body;
        if (auth !== envHandler("GITHUB_WORKFLOW_SECRET")){
            logger.protect(`Unauthorized access to ${req.originalUrl} by ${req.ip}`);
            return res.status(401).json({"success":false, "message":"Unauthorized"});
        }
        const user = await User.findOne({username: username})
        if (!user){
            logger.error(`User ${username} not found`);
            return res.status(404).json({"success":false, "message":"User not found"});
        }
        const issuedata: GitHubIssue = await axios.get(issue_url);
        const issuePayload = {
            repo: issuedata.repository_url,
            title: issuedata.title,
            difficulty: difficultyFind(issuedata.labels)
        }
        const newIssue = new Issue(issuePayload);
        await newIssue.save();
        const newPR = new PR({issue: newIssue._id, user: user._id});
        await newPR.save();
        user.PRs.push(newPR._id);

        const newscore = user.score;

        switch (issuePayload.difficulty) {
            case "easy":
                user.score = newscore + 10;
                break;
            case "medium":
                user.score = newscore + 30;
                break;
            case "hard":
                user.score = newscore + 50;
                break;
            case "expert":
                user.score = newscore + 100;
                break;
            default:
                break;
        }

        user.score = newscore;
        logger.info(`User ${username} has scored ${user.score} points`);
        await user.save();

        return res.status(200).json({"success":true});
})