import "dotenv/config";

export const db = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

export const redis = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
};

export const port = process.env.PORT;
export const corsUrl = process.env.CORS_URL;
