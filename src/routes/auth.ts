import express from 'express';
import passport from 'passport';
import { githubOptions } from '../helpers/githubOptions.js';
import { callbackAuthController } from '../controllers/authController.js';

const auth = express.Router();

passport.use(githubOptions);

auth.use(passport.initialize());
auth.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


auth.get('/github', passport.authenticate('github', {scope  : ['user:email']}));

auth.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), callbackAuthController);

export default auth;