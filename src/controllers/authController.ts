import { Router, Request, Response, NextFunction } from 'express';
import AuthService from '../helpers/authServices';
import { registerDto, type registerDtoType } from '../helpers/authDto'; // Import DTOs for validation

const router = Router();

class AuthController {
  // GitHub OAuth Redirect
  public static GitHubLoginRedirect = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const redirectUrl = AuthService.getGitHubOAuthRedirectUrl();
      return res.redirect(redirectUrl);
    } catch (error) {
      next(error); // Forward the error to an error-handling middleware
    }
  };

  // GitHub OAuth Callback
  public static GitHubLoginCallback = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code } = req.query;
      if (!code) {
        throw new Error('Authorization code is missing');
      }

      // Handle GitHub OAuth callback and retrieve user info
      const { token, user } = await AuthService.handleGitHubCallback(code as string);
      return res.json({ token, user });
    } catch (error) {
      next(error); // Forward the error to an error-handling middleware
    }
  };

  // Register method
  public static Register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate request body using DTO and ensure it's of type registerDtoType
      const parsedData: registerDtoType = registerDto.parse(req.body);

      // Register a new user using AuthService
      const newUser = await AuthService.registerUser(parsedData);
      return res.status(201).json(newUser);
    } catch (error) {
      next(error); // Forward the error to an error-handling middleware
    }
  };

  // Login method (without GitHub OAuth)
  public static Login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new Error('Email or password is missing');
      }

      // Use AuthService for login logic
      const user = await AuthService.loginUser(email, password);
      return res.json(user);
    } catch (error) {
      next(error); // Forward the error to an error-handling middleware
    }
  };
}

// Callback controller after successful GitHub authentication
export const callbackAuthController = (req: Request, res: Response) => {
  res.send('GitHub authentication successful');
};

// Failure controller in case of authentication failure
export const failureAuthController = (req: Request, res: Response) => {
  res.send('GitHub authentication failed');
};

// Define the routes
router.post('/login', AuthController.Login); // Handle login
router.get('/callback', AuthController.GitHubLoginCallback); // Handle OAuth callback
router.get('/login/github', AuthController.GitHubLoginRedirect); // GitHub OAuth Redirect
router.post('/register', AuthController.Register); // Handle registration

export default router;
