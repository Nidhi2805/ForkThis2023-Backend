import express from 'express';
import cors from 'cors';
import expressMongoSanitize from 'express-mongo-sanitize';
import { config } from 'dotenv';

config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use(expressMongoSanitize());


app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});

export default app;