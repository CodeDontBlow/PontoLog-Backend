import FatoRepository from "./fatoRepository";

type Params = {
  year: number;
  endYear?: number;
  uf?: string;
  sh?: string;
};

const START_YEAR = 2014;
const END_YEAR = 2024;
const CONCURRENCY_LIMIT = 10;
const UFs = ['SP', 'MG', 'RS', 'PR', 'MT', 'PA', 'RJ', 'SC'];
const SH_OPTIONS = ['no_sh4_por'];

export default class FatoPreloader<T> {
  private repository: FatoRepository<T>;

  constructor(repository: FatoRepository<T>) {
    this.repository = repository;
  }

  private chunkArray<T>(arr: T[], size: number): T[][] {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  }

  private buildParamCombos(): Params[] {
    const combos: Params[] = [];

    for (let year = START_YEAR; year <= END_YEAR; year++) {
      for (const uf of UFs) {
        for (const sh of SH_OPTIONS) {
          combos.push({ year, uf, sh });
        }
      }
    }

    for (let start = START_YEAR; start < END_YEAR; start++) {
      for (let end = start + 1; end <= END_YEAR; end++) {
        for (const uf of UFs) {
          for (const sh of SH_OPTIONS) {
            combos.push({ year: start, endYear: end, uf, sh });
          }
        }
      }
    }

    return combos;
  }

  public async preloadCache(): Promise<void> {
    const paramCombos = this.buildParamCombos();
    const chunks = this.chunkArray(paramCombos, CONCURRENCY_LIMIT);

    let completed = 0;
    const total = paramCombos.length * 3;

    for (const chunk of chunks) {
      await Promise.all(
        chunk.map(async (params) => {
          const { year, endYear, uf, sh } = params;

          try {
            await this.repository.getAllData(params);
            await this.repository.getFat(year, endYear, uf);
            await this.repository.getProduct(sh!, year, endYear, uf);

            completed += 3;
            console.log(`Progress: ${completed}/${total}`);
          } catch (err) {
            console.error(`Erro ao pré-carregar para:`, params, err);
          }
        })
      );
    }

    console.log('Preload concluído com chamadas diretas (cache embutido).');
  }
}
