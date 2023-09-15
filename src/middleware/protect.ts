import catchAsync from '../managers/catchAsync.js';
import jwt from 'jsonwebtoken';
import envHandler from '../managers/envHandler.js';
import logger from '../../logs/logger.js';

export const protect = catchAsync(
    async (req:any, res:any, next:any) => {
        const token = req.headers['authorization'];
        jwt.verify(token, envHandler("JWT_KEY"), function (err:any, data:any) {
        if (err) {
            logger.error("Unauthorized access to " + req.originalUrl + " by " + req.ip + "")
            res.status(401).send({ error: "NotAuthorized" })
        } else {
            logger.info("Authorized access to " + req.originalUrl + " by " + req.ip + "")
            req.user = data;
            next();
        }
    })
})