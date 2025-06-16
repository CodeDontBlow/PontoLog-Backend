import express from 'express';
import cors from 'cors';
import router from './routes';
import { corsUrl } from './config';

const app = express();

app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));
app.use(router);

export default app;