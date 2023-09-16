import catchAsync from "../managers/catchAsync.js";
import User from "../models/userModel.js";

export const getUserController = catchAsync(
    async (req:any, res, next) => {
        const existinguser = await User.findOne({id:req.user.id})
        if(!existinguser){
            return res.status(401).send({ error: "NotAuthorized" })
        }
        return res.status(200).json(existinguser);
})