import catchAsync from "../managers/catchAsync.js";
import envHandler from "../managers/envHandler.js";
import jwt from 'jsonwebtoken';

export const callbackAuthController = catchAsync(
    async (req: any, res: any, next: any) => {
        const token = jwt.sign({id: req.user.id}, envHandler("JWT_KEY"), {expiresIn: 60 * 60 * 24 * 10})
        res.redirect(`${envHandler("FRONTEND_URL")}/?token=${token}`);
})