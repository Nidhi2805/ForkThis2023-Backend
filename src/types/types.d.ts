import 'express-session';

declare module 'express-session' {
  interface Session {
    token?: string; // Add the token property to the Session interface
  }
}
