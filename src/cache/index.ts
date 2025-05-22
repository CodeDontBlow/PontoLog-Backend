import { redis } from "../config";
import { createClient } from "redis";

const redisClient = createClient({
  socket: {
    host: redis.host,
    port: redis.port,
  },
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));
redisClient.on("connect", () => console.log("Redis has been initialized!"));

(async () => {
  await redisClient.connect();
})();

export { redisClient };
