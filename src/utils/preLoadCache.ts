// Code com concorrencia e enumeração

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
  try {
    console.log(`Preloading: ${fullUrl}`);
    await axios.get(fullUrl);
  } catch (error: any) {
    console.error(`Failed to preload ${fullUrl}:`, error.message || error);
  }
}


////////////////////////////////////////////////////////////////////////////////////

// Code com piores casos fixos: 2014-2023?endYear=2024 e 2014?endYear=2024-2015
// e anos unicos
// import axios from 'axios'

// const BASE_URL = 'http://localhost:3000'; // ajuste se necessário
// const START_YEAR = 2014;
// const END_YEAR = 2023;
// const QUERY_BASE = '?endYear=2024';

// export async function preLoadCache(): Promise<void> {
//   const routes: Array<(year: number) => string> = [
//     (year) => `/exportacao/fat/${year}${QUERY_BASE}`,
//     (year) => `/exportacao/via/${year}${QUERY_BASE}`,
//     (year) => `/exportacao/urf/${year}${QUERY_BASE}`,
//     (year) => `/exportacao/vl_agregado/${year}${QUERY_BASE}`,
//     (year) => `/exportacao/kg_liquido/${year}${QUERY_BASE}`,
//     (year) => `/exportacao/vl_fob/${year}${QUERY_BASE}`,
//     (year) => `/exportacao/countries/${year}${QUERY_BASE}`,
//   ];

//   for (let year = START_YEAR; year <= END_YEAR; year++) {
//     for (const routeFn of routes) {
//       const url = `${BASE_URL}${routeFn(year)}`;
//       try {
//         console.log(`Preloading: ${url}`);
//         await axios.get(url);
//       } catch (error: any) {
//         console.error(`Failed to preload ${url}:`, error.message || error);
//       }
//     }
//   }

//   console.log('Preloading completed.');
// }
