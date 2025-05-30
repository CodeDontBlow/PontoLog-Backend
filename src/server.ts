import https from 'https';
import fs from 'fs';
import 'dotenv/config';
import app from './app';
import { port } from './config';
import { preloadAll } from './utils/preload'

async function startSecureServer() {
  const keyPath = process.env.KEY_OPTIONS;
  const certPath = process.env.CERT_OPTIONS;

  if (!keyPath || !certPath) {
    console.error("KEY_OPTIONS ou CERT_OPTIONS não definidas.");
    process.exit(1);
  }

  const options = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
  };

  // Executa preload para todos os repositórios
  await preloadAll();

  https.createServer(options, app).listen(port, () => {
    console.log(`HTTPS Server listening on https://localhost:${port}`);
  });
}

startSecureServer();
