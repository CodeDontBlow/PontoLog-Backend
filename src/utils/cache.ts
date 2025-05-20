import { createClient } from 'redis';

const redisClient = createClient({
  socket: {
    host: 'localhost', 
    port: 6379         
  }
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));
redisClient.on('connect', () => console.log('Conectado ao Redis com sucesso!'));

(async () => {
  await redisClient.connect(); 
})();

export default redisClient;