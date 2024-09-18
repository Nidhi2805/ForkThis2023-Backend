import express from 'express';
import AuthService from '../helpers/authServices';
import { callbackAuthController, failureAuthController } from '../controllers/authController';

const auth = express.Router();

auth.get('/github', (req, res) => {
  const redirectUrl = AuthService.getGitHubOAuthRedirectUrl();
  res.redirect(redirectUrl);
});

auth.get('/github/callback', async (req, res, next) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res.redirect('/auth/failure'); 
    }

    const { token, user } = await AuthService.handleGitHubCallback(code as string);

    req.session.token = token;

    return res.json({ message: 'Login successful', user, token });
  } catch (error) {
    next(error);
  }
});

auth.get('/failure', failureAuthController);

export default auth;
