import catchAsync from '../managers/catchAsync.js';
import jwt, {VerifyErrors, JwtPayload} from 'jsonwebtoken';
import envHandler from '../managers/envHandler.js';
import logger from '../../logs/logger.js';
import {Request, Response, NextFunction} from 'express';

export const protect = catchAsync(
    async (req: Request, res: Response, next:NextFunction) => {
        const token:string = req.headers['authorization'];
        jwt.verify(token, envHandler("JWT_KEY"), function (err: VerifyErrors | null, data: JwtPayload | undefined) {
        if (err) {
            logger.error("Unauthorized access to " + req.originalUrl + " by " + req.ip + "")
            res.status(401).send({ error: "Not Authorized" })
        } else {
            logger.info("Authorized access to " + req.originalUrl + " by " + req.ip + "")
            req.user = data;
            next();
        }
    })
})