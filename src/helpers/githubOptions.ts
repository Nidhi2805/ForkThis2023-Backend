
import { Strategy } from "passport-github2";
import envHandler from "../managers/envHandler.js";
import User from "../models/userModel.js";
import logger from "../../logs/logger.js";

const githubOptions = new Strategy({
        clientID: envHandler("GITHUB_CLIENT_ID"),
        clientSecret: envHandler("GITHUB_CLIENT_SECRET"),
        callbackURL: `${envHandler("URL")}/auth/github/callback`
      }, async function(accessToken:any, refreshToken:any, profile:any, cb:any) { 
        try{
          const user = await User.findOne({ githubUsername: profile.username });
          if (user === null) {
            console.log('making new user')
            console.log(profile)
            if(!profile.displayName){
                profile.displayName = profile.username
            }
            const newUser = new User({
              githubUsername: profile.username,
              name: profile.displayName,
              id: profile.id,
            //   email: profile.emails[0].value,
            });
            await newUser.save();
            logger.info(profile.username + " has made an account");
            return cb(null, newUser);
          }
          logger.info(profile.username + " has logged in ");
          return cb(null, user);
        }
        catch (err) {
          logger.error(err);
          return cb(err, null);
        }
})

export default githubOptions;