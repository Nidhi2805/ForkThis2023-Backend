import express, {Express} from 'express';
import cors from 'cors';
import session from 'express-session';
import expressMongoSanitize from 'express-mongo-sanitize';
import envHandler from "./managers/envHandler.js";
import morgan from 'morgan';
import helmet from 'helmet';
import pullrequest from './routes/pullrequest.js';
import register from './routes/register.js';
import leaderboard from './routes/leaderboard.js';
import connectToDB from './managers/db.js';
import user from './routes/user.js';
import auth from './routes/auth.js';
import generate from './routes/generate.js';

const app: Express = express();

app.use(session({
    secret: envHandler("PASSPORT_SECRET"),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

app.use(cors());
app.use(express.json());
app.use(helmet());

if (envHandler('NODE_ENV') === 'dev') app.use(morgan('dev'));

connectToDB();

app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
})

app.use(expressMongoSanitize());

app.use('/pullrequest', pullrequest);
app.use('/github', register)
app.use('/leaderboard', leaderboard)
app.use('/user', user);
app.use('/auth', auth);
app.use('/generate', generate);

app.listen(3001, () => {
    console.log(`Server started at port ${envHandler('PORT')}`);
});

export default app;