import express from 'express';
import cors from 'cors';
import router from './routes';
import { corsUrl, port } from './config';

const app = express();

app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));
app.use(router);

// Rodar localmente em HTTP
app.listen(port, () => {
  console.log(`HTTP Server listening on http://localhost:${port}`);
});

export default app