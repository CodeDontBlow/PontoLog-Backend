// Code com concorrencia e enumeração
import { redisClient } from '../cache';
import { getCacheKey } from './cacheFormat';

import axios from 'axios';

const BASE_URL = 'http://18.204.76.34:3000';
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

export async function preLoadCache(): Promise<void> {
  const routes: Array<(path: string, query?: string) => string> = [
    (path, query = '') => `/exportacao/fat/${path}${query}`,
    (path, query = '') => `/exportacao/via/${path}${query}`,
    (path, query = '') => `/exportacao/urf/${path}${query}`,
    (path, query = '') => `/exportacao/vl_agregado/${path}${query}`,
    (path, query = '') => `/exportacao/kg_liquido/${path}${query}`,
    (path, query = '') => `/exportacao/vl_fob/${path}${query}`,
    (path, query = '') => `/exportacao/countries/${path}${query}`,
  ];

  const urls: string[] = [];

  for (let year = START_YEAR; year <= END_YEAR; year++) {
    for (const routeFn of routes) {
      urls.push(routeFn(`${year}`));
    }
  }

  for (let start = START_YEAR; start < END_YEAR; start++) {
    for (let end = start + 1; end <= END_YEAR; end++) {
      for (const routeFn of routes) {
        urls.push(routeFn(`${start}`, `?endYear=${end}`));
      }
    }
  }

  const chunks = chunkArray(urls, CONCURRENCY_LIMIT);

  for (const chunk of chunks) {
    await Promise.all(chunk.map(url => requestRoute(url)));
  }

  console.log('Preloading completed with controlled concurrency.');
}


async function requestRoute(url: string): Promise<void> {
  const fullUrl = `${BASE_URL}${url}`;
  const cacheKey = getCacheKey('preload', { url }); // você pode trocar 'preload' por um nome mais específico

  try {
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      console.log(`Cached (skipped): ${fullUrl}`);
      return;
    }

    console.log(`Preloading: ${fullUrl}`);
    await axios.get(fullUrl);

    // Se quiser guardar apenas o fato de que foi feito, pode ser qualquer valor.
    await redisClient.set(cacheKey, 'ok', {
      EX: 60 * 60 * 24 * 7, // TTL de 7 dias, por exemplo
    });

  } catch (error: any) {
    console.error(`Failed to preload ${fullUrl}:`, error.message || error);
  }
}

