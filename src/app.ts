import express,{Request,Response,NextFunction} from 'express';
import cors from 'cors';
import passport, { Profile, } from 'passport';
import { Strategy as GitHubStrategy,StrategyOptionsWithRequest } from 'passport-github2';
import session from 'express-session';
import expressMongoSanitize from 'express-mongo-sanitize';
import envHandler from "./managers/envHandler.js";
import morgan from 'morgan';
import helmet from 'helmet';
import pullrequest from './routes/pullrequest.js';
import register from './routes/register.js';

const PORT = envHandler("PORT")

// interface User{
//   id: string;
//   username: string;
// }

// function ensureAuthenticated(req:Request,res:Response,next:NextFunction){
//   if(req.isAuthenticated()){
//     return next();
//   }
//   res.redirect('/');
// }


const app = express();

app.use(cors());

app.use(express.json());

app.use(helmet());

if (envHandler('NODE_ENV') === 'dev') app.use(morgan('dev'));

app.use(expressMongoSanitize());

// app.use(session({secret: envHandler('SECRET'),resave: false, saveUninitialized: false}));

// initializing passport
// app.use(passport.initialize());
// app.use(passport.session());

// const githubStrategyOptions: StrategyOptionsWithRequest={
//     clientID: GITHUB_CLIENT_ID as string,
//     clientSecret: GITHUB_CLIENT_SECRET as string,
//     callbackURL: `${envHandler("URL")}/authenticate/github/callback`,
//     passReqToCallback: true,
//   };
  
//   passport.use(
//     new GitHubStrategy(
//       githubStrategyOptions,(req: express.Request,accessToken:string,refreshToken: string,profile: Profile,done: (err?: Error | null, profile?: any)=>void)=>{
//         console.log(profile);
//         const user: User={
//           id: profile.id,
//           username: profile.displayName,
//         };
//         return done(null,user);
//       }
//     )
//   );
      
//   passport.serializeUser((user, done) => {
//     done(null, user);
//   });
  
//   passport.deserializeUser((user:User, done) => {
//     done(null, user);
//   });
  
//   // github authentication route
  
//   app.get('/authenticate/github',passport.authenticate('github'));
  
//   // github callback route
//   app.get('/authenticate/github/callback',passport.authenticate('github',{failureRedirect:'/'}),(req:Request,res:Response)=>{
//     res.redirect('/profile');
//   } )
  
//   // protected route
  
//   app.get('/profile',ensureAuthenticated,(req:Request, res:Response)=>{
//     if(req.user){
//       const user=req.user as User;
//       res.send(`Welcome to you github-authenticated profile,${user.username}`);
//     }else{
//       res.send("user not authenticated");
//     }
//   })
  
// app.get('/',(req:Request,res:Response)=>{
//     res.send('home Page ');
// })


app.use('/pullrequest', pullrequest);

app.use('/github', register)

app.listen(3001, () => {
    console.log(`Server started at port ${PORT}`);
});


export default app;