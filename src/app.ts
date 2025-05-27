import fs from 'fs';
import https from 'https';
import express from 'express';
import router from './routes';
import cors from 'cors';
import './database';
import { corsUrl, port } from './config';
import { preLoadCache } from './utils/preLoadCache';

const app = express();
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));
app.use(router);

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/pontolog.hopto.org/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/pontolog.hopto.org/fullchain.pem'),
};

https.createServer(options, app).listen(port, () => {
  console.log(`HTTPS Server listening on port ${port}`);
  preLoadCache();
});
