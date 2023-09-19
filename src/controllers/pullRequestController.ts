// import {Request, Response, NextFunction } from 'express';
// import  catchAsync  from '../managers/catchAsync.js';
// import envHandler from '../managers/envHandler.js';
// import User, { UserInterface } from '../models/userModel.js';
// import axios, { AxiosResponse } from 'axios';
// import Issue, { IssueInterface } from '../models/issueModel.js';
// import GitHubIssue from '../types/githubIssue.js';
// import logger from '../../logs/logger.js';
// import difficultyFind from '../helpers/difficultyFind.js';
// import difficultyScore from '../helpers/difficultyScore.js';
// // import PR from '../models/prModel.js';

// export const ClosedPRController = catchAsync(
//     async (req: Request, res: Response, next: NextFunction) => {
//         const auth = req.headers.authorization;
//         const {username, issue_tags, issue_url, pr_url} = req.body;
//         if (auth !== envHandler("GITHUB_WORKFLOW_SECRET")){
//             logger.protect(`Unauthorized access to ${req.originalUrl} by ${req.ip}`);
//             return res.status(401).json({"success":false, "message":"Unauthorized"});
//         }
//         const user: UserInterface = await User.findOne({githubUsername: username})
//         if (!user){
//             logger.error(`User ${username} not found`);
//             return res.status(404).json({"success":false, "message":"User not found"});
//         }
//         const PRissue: AxiosResponse<GitHubIssue> = await axios.get(issue_url);
//         const PRissuedata: GitHubIssue = PRissue.data;
//         const title:string = PRissuedata.title;
//         const issueNum:number = parseInt(title.split("#")[1]);  
//         const issue: AxiosResponse<GitHubIssue> = await axios.get(`${PRissuedata.repository_url}/issues/${issueNum}`)   
//         const issuedata: GitHubIssue = issue.data; 
//         const issuePayload = {
//             repo: issuedata.repository_url,
//             title: issuedata.title,
//             difficulty: difficultyFind(issuedata.labels)
//         }
//         const newIssue: IssueInterface = new Issue(issuePayload);
//         await newIssue.save();
//         // const newPR = new PR({issue: newIssue._id, user: user._id});
//         // await newPR.save();
//         user.Issues.push(newIssue._id);

//         let newscore:number = user.score;

//         newscore = newscore + difficultyScore(issuePayload.difficulty);

//         user.score = newscore;
//         logger.info(`User ${username} has scored ${user.score} points`);
//         await user.save();
//         return res.status(200).json({"success":true});
// })