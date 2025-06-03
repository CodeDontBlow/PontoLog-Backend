import https from 'https';
import http from 'http';
import fs from 'fs';
import 'dotenv/config';
import app from './app';
import { port } from './config';
import { preloadAll } from './utils/preload';

// Debug extendido
const debug = require('debug')('server:main');
process.on('unhandledRejection', (err) => {
  debug('Unhandled Rejection:', err);
  process.exit(1);
});

interface NodeJSError extends Error {
  code?: string;
  errno?: number;
  syscall?: string;
  address?: string;
  port?: number;
}

async function startServer() {
  try {
    debug('Starting preload...');
    await preloadAll();
    
    // Verifica se deve usar HTTPS
    if (process.env.KEY_OPTIONS && process.env.CERT_OPTIONS) {
      debug('HTTPS mode enabled');
      const options = {
        key: fs.readFileSync(process.env.KEY_OPTIONS),
        cert: fs.readFileSync(process.env.CERT_OPTIONS),
      };
      return createServer(https.createServer(options, app), 'HTTPS');
    } else {
      debug('HTTP mode enabled');
      return createServer(http.createServer(app), 'HTTP');
    }
  } catch (error) {
    debug('Server startup failed:', error);
    throw error;
  }
}

function createServer(server: http.Server | https.Server, protocol: string) {
  return new Promise<void>((resolve) => {
    server.listen(port, () => {
      console.log(`\n🚀 ${protocol} Server running on ${protocol.toLowerCase()}://localhost:${port}\n`);
      resolve();
    });

    server.on('error', (error: NodeJSError) => {
      console.error('\n❌ Server startup error:', error.message);
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use`);
        console.log(`Run this command to kill the process: kill -9 $(lsof -t -i:${port})`);
      }
      process.exit(1);
    });
  });
}

// Inicialização com tratamento de erros
startServer()
  .then(() => debug('Server started successfully'))
  .catch((err) => {
    console.error('❌ Fatal error during startup:', err);
    process.exit(1);
  });