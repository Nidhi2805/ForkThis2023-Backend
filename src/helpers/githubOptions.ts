import { Strategy as GitHubStrategy } from "passport-github2";
import dotenv from "dotenv";
import User from "../models/userModel.js"; 
import logger from "../../logs/logger.js"; 

dotenv.config(); 

const githubOptions = new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID, 
  clientSecret: process.env.GITHUB_CLIENT_SECRET, 
  callbackURL: `${process.env.URL}/auth/github/callback`, 
  scope: ['user:email'] 
}, async function(accessToken, refreshToken, profile, done) {
  try {
    let user = await User.findOne({ githubUsername: profile.username });

    if (!user) {
      const newUser = new User({
        githubUsername: profile.username,
        name: profile.displayName || profile.username, 
        id: profile.id,
        email: profile.emails[0].value 
      });

      user = await newUser.save();

      logger.info(`${profile.username} has made an account`);
      return done(null, newUser);
    } else {
      logger.info(`${profile.username} has logged in`);
      return done(null, user);
    }
  } catch (err) {
    logger.error(err);
    return done(err, null);
  }
});

export default githubOptions;
