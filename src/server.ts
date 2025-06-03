import { preloadAll } from './utils/preload'
import { AppDataSource } from './database'
import https from 'https';
import fs from 'fs';
import 'dotenv/config';
import app from './app';
import { port } from './config';

async function initializeApp() {
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
    
    // Verifica se o módulo está sendo executado diretamente
    if (require.main === module) {
      await preloadAll();
    }
    
    await startSecureServer();
  } catch (err) {
    console.error("Error during initialization", err);
    process.exit(1);
  }
}

async function startSecureServer() {
  const keyPath = process.env.KEY_OPTIONS;
  const certPath = process.env.CERT_OPTIONS;

  if (!keyPath || !certPath) {
    console.error("KEY_OPTIONS or CERT_OPTIONS not defined.");
    process.exit(1);
  }

  const options = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
  };

  https.createServer(options, app).listen(port, () => {
    console.log(`HTTPS Server listening on https://pontolog.hopto.org:${port}`);
  });
}

// Inicializa o app apenas se for executado diretamente
if (require.main === module) {
  initializeApp();
}