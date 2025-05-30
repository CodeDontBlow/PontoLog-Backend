import fs from 'fs';
import https from 'https';
import express from 'express';
import router from './routes';
import cors from 'cors';
import 'dotenv/config'
import './database';
import { corsUrl, port } from './config';

const app = express();
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));
app.use(router);

const options = {
  key: fs.readFileSync(process.env.KEY_OPTIONS),
  cert: fs.readFileSync(process.env.CERT_OPTIONS),
};

https.createServer(options, app).listen(port, () => {
  console.log(`HTTPS Server listening on port ${port}`);
});