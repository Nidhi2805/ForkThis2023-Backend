import { randomBytes } from 'crypto';
import * as https from 'https';
import querystring from 'querystring';
import User from '../models/userModel';
import dotenv from 'dotenv';
import { registerDtoType } from './authDto'; // Import DTO type for type safety

dotenv.config();

export default class AuthService {
  private static clientID = process.env.GITHUB_CLIENT_ID;
  private static clientSecret = process.env.GITHUB_CLIENT_SECRET;
  private static redirectUri = `${process.env.URL}/auth/github/callback`;

  public static getGitHubOAuthRedirectUrl(): string {
    const url = `https://github.com/login/oauth/authorize?client_id=${this.clientID}&redirect_uri=${this.redirectUri}&scope=user`;
    return url;
  }

  public static async handleGitHubCallback(code: string): Promise<{ token: string, user: any }> {
    const tokenData = querystring.stringify({
      client_id: this.clientID,
      client_secret: this.clientSecret,
      code,
      redirect_uri: this.redirectUri,
    });

    const accessToken = await this.fetchAccessToken(tokenData);
    const userData = await this.fetchGitHubUser(accessToken);

    let user = await User.findOne({ githubId: userData.id });

    if (!user) {
      user = new User({
        githubId: userData.id,
        email: userData.email || '',
        githubUsername: userData.name || userData.login,
      });
      await user.save();
    }

    const token = `JWT-${randomBytes(16).toString('hex')}`;

    return { token, user };
  }

  private static fetchAccessToken(postData: string): Promise<string> {
    const options = {
      hostname: 'github.com',
      path: '/login/oauth/access_token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Content-Length': postData.length,
      },
    };

    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          const result = JSON.parse(data);
          if (result.access_token) {
            resolve(result.access_token);
          } else {
            reject(new Error('Failed to get access token from GitHub'));
          }
        });
      });

      req.on('error', (e) => {
        reject(e);
      });

      req.write(postData);
      req.end();
    });
  }

  private static fetchGitHubUser(accessToken: string): Promise<any> {
    const options = {
      hostname: 'api.github.com',
      path: '/user',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'User-Agent': 'node.js',
      },
    };

    return new Promise((resolve, reject) => {
      https
        .get(options, (res) => {
          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => {
            resolve(JSON.parse(data));
          });
        })
        .on('error', (e) => {
          reject(e);
        });
    });
  }

  public static async registerUser(data: registerDtoType): Promise<any> {
    const newUser = new User({
      email: data.email,
      password: data.password,
      name: data.name,
    });

    await newUser.save();
    return newUser;
  }

  public static async loginUser(email: string, password: string): Promise<any> {
    // Assuming the User model has a method for finding a user and checking password
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      throw new Error('Invalid email or password');
    }

    // Generate and return a token or other login-related info
    const token = `JWT-${randomBytes(16).toString('hex')}`;
    return { user, token };
  }
}
