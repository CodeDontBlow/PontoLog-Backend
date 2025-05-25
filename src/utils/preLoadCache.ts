import { redisClient } from '../cache';
import { getCacheKey } from './cacheFormat';
import axios from 'axios';
import "dotenv/config";

const BASE_URL = process.env.BASE_URL
const START_YEAR = 2014;
const END_YEAR = 2024;
const CONCURRENCY_LIMIT = 10;

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

function buildQuery(params: Record<string, any>): string {
  const query = new URLSearchParams(params).toString();
  return query ? `?${query}` : '';
}

export async function preLoadCache(): Promise<void> {
const routes: Array<(path: string, query?: string) => string> = [
  (path, query = '') => `/exportacao/fat/${path}${query}`,
  (path, query = '') => `/exportacao/${path}${query}`,
  (path, query = '') => `/importacao/fat/${path}${query}`,
  (path, query = '') => `/importacao/${path}${query}`,
  (path, query = '') => `/balanco/${path}${query}`,
  
];


  const urls: string[] = [];

for (let year = START_YEAR; year <= END_YEAR; year++) {
  for (const routeFn of routes) {
    // só o parâmetro sh para anos únicos
    const query = buildQuery({ sh: 'no_sh4_por' });
    urls.push(routeFn(`${year}`, query));
  }
}

for (let start = START_YEAR; start < END_YEAR; start++) {
  for (let end = start + 1; end <= END_YEAR; end++) {
    for (const routeFn of routes) {
      // sh + endYear para anos compostos
      const query = buildQuery({ sh: 'no_sh4_por', endYear: end });
      urls.push(routeFn(`${start}`, query));
    }
  }
}


  const chunks = chunkArray(urls, CONCURRENCY_LIMIT);

  let completed = 0;
  const total = urls.length;

  for (const chunk of chunks) {
    await Promise.all(chunk.map(async url => {
      await requestRoute(url);
      completed++;
      console.log(`Progress: ${completed}/${total}`);
    }));
  }

  console.log('Preloading completed with controlled concurrency.');
}

async function requestRoute(url: string): Promise<void> {
  const fullUrl = `${BASE_URL}${url}`;
  const cacheKey = getCacheKey('preload', { url });

  try {
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      console.log(`Cached (skipped): ${fullUrl}`);
      return;
    }

    console.log(`Preloading: ${fullUrl}`);
    await axios.get(fullUrl, { timeout: 1500000 }); 

    await redisClient.set(cacheKey, 'ok', {
      EX: 60 * 60 * 24 * 2, 
    });

  } catch (error: any) {
    console.error(`Failed to preload ${fullUrl}:`, error.message || error);
  }
}
