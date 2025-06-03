import FatoRepository from "../database/repository/fatoRepository";
import BalancaRepository from "../database/repository/balancaRepository";

type Params = {
  year: number;
  endYear?: number;
  sh?: string;
  region?: string | null;
  productName?: string | null;
  uf?: string | null;
};

const START_YEAR = 2014;
const END_YEAR = 2015;
const CONCURRENCY_LIMIT = 10;
const SH_OPTIONS = ['no_sh4_por'];
const UF_LIST = ['SP'];
const REGION_LIST = ['REGIAO SUDESTE'];

// const END_YEAR = 2025; // todos os anos


// const UF_LIST = ['SP', 'MG', 'RS', 'PR', 'MT', 'PA', 'RJ', 'SC']; // estatos mais ifluentes
// const REGION_LIST = ['REGIAO SUDESTE', 'REGIAO SUL', 'REGIAO NORTE']; //regioes mais influentes


// const UF_LIST = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']; //todos os estados
// const REGION_LIST = ['REGIAO NORTE', 'REGIAO NORDESTE', 'REGIAO CENTRO-OESTE', 'REGIAO SUDESTE', 'REGIAO SUL']; //todas as regioes


export default class FatoPreloader<T> {
  constructor(
    private readonly repository: FatoRepository<T> | BalancaRepository,
    private readonly isBalanca = repository instanceof BalancaRepository
  ) {}

  public async preloadCache(): Promise<void> {
    const paramCombos = this.buildParamCombos();
    const totalTasks = paramCombos.length;
    const chunks = this.chunkArray(paramCombos, CONCURRENCY_LIMIT);
    
    let completedTasks = 0;
    
    for (const chunk of chunks) {
      await Promise.all(chunk.map(async (params) => {
        try {
          await this.processParams(params);
          completedTasks++;
          console.log(`Progress: ${completedTasks}/${totalTasks}`);
        } catch (err) {
          console.error(`Erro ao pré-carregar:`, params, err);
        }
      }));
    }
    
    console.log('Preload concluído para todos os anos e intervalos.');
  }

  private chunkArray<T>(array: T[], size: number): T[][] {
    return Array.from(
      { length: Math.ceil(array.length / size) },
      (_, i) => array.slice(i * size, i * size + size)
    );
  }

  private generateYearCombinations(): Array<{year: number, endYear?: number}> {
    const combinations: Array<{year: number, endYear?: number}> = [];
    
    // Anos únicos de 2014 a 2024
    for (let year = START_YEAR; year <= END_YEAR; year++) {
      combinations.push({ year });
    }
    
    // Intervalos de anos: 2014-2024, 2015-2024, ... 2023-2024
    for (let start = START_YEAR; start < END_YEAR; start++) {
      combinations.push({ year: start, endYear: END_YEAR });
    }
    
    // Intervalos consecutivos: 2014-2015, 2015-2016, ... 2023-2024
    for (let start = START_YEAR; start < END_YEAR; start++) {
      combinations.push({ year: start, endYear: start + 1 });
    }
    
    return combinations;
  }

  private buildParamCombos(): Params[] {
    const yearCombinations = this.generateYearCombinations();
    const combos: Params[] = [];
    
    yearCombinations.forEach(({year, endYear}) => {
      // Combinações base
      SH_OPTIONS.forEach(sh => {
        combos.push({ year, endYear, sh });
        combos.push({ year, endYear, sh, region: null, uf: null, productName: null });
      });
      
      // Combinações com UF
      UF_LIST.forEach(uf => {
        SH_OPTIONS.forEach(sh => {
          combos.push({ year, endYear, sh, uf, region: null, productName: null });
        });
        combos.push({ year, endYear, uf });
      });
      
      // Combinações com região
      REGION_LIST.forEach(region => {
        SH_OPTIONS.forEach(sh => {
          combos.push({ year, endYear, sh, region, uf: null, productName: null });
        });
        combos.push({ year, endYear, region });
      });
      
      // Combinações com UF + região
      UF_LIST.forEach(uf => {
        REGION_LIST.forEach(region => {
          SH_OPTIONS.forEach(sh => {
            combos.push({ year, endYear, sh, uf, region, productName: null });
          });
        });
      });
    });
    
    return combos;
  }

  private async processParams(params: Params): Promise<void> {
    const { year, endYear = NaN, sh, region, productName, uf } = params;
    
    if (this.isBalanca) {
      return this.processBalancaParams(year, endYear, sh, uf, productName);
    } else {
      return this.processFatoParams(year, endYear, sh, region, uf, productName);
    }
  }

  private async processBalancaParams(
    year: number,
    endYear: number,
    sh: string | undefined,
    uf: string | null | undefined,
    productName: string | null | undefined
  ): Promise<void> {
    const repo = this.repository as BalancaRepository;
    await repo.getBalancoComercial(
      year,
      endYear,
      uf ?? undefined,
      undefined, // Região sempre indefinida
      sh,
      productName ?? undefined
    );
  }

  private async processFatoParams(
    year: number,
    endYear: number,
    sh: string | undefined,
    region: string | null | undefined,
    uf: string | null | undefined,
    productName: string | null | undefined
  ): Promise<void> {
    const repo = this.repository as FatoRepository<T>;
    const promises: Promise<unknown>[] = [];

    if (uf) {
      promises.push(
        repo.getVia(year, endYear, uf),
        repo.getUrf(year, endYear, uf)
      );
    }

    if (sh) {
      promises.push(
        repo.getAllData({
          year,
          endYear,
          sh,
          region: region ?? undefined,
          productName: productName ?? undefined,
          uf: uf ?? undefined
        })
      );
    }

    if (!sh && region === undefined && productName === undefined) {
      promises.push(repo.getFat(year, endYear, uf ?? undefined));
    }

    await Promise.all(promises);
  }
}