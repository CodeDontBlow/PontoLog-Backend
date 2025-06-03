import express from 'express';
import cors from 'cors';
import router from './routes';
import { corsUrl } from './config'; // Remova a importação da port

const app = express();

app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));
app.use(router);

// Remova o app.listen() deste arquivo
// A inicialização do servidor deve ficar apenas no server.ts

export default app;