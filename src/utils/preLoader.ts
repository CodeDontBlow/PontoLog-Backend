import FatoRepository from "../database/repository/fatoRepository";
import BalancaRepository from "../database/repository/balancaRepository";

type Params = {
  year: number;
  sh?: string;
  region?: string | null;
  productName?: string | null;
  uf?: string | null; // Novo campo
};
// esta com erro na balanca comercial, está puxando com o regiao e dando erro
const YEAR = 2014;
const CONCURRENCY_LIMIT = 10;
const SH_OPTIONS = ['no_sh4_por'];
const UF_LIST = ['SP'];
const REGION_LIST = ['REGIAO SUDESTE'];

export default class FatoPreloader<T> {
  private repository: FatoRepository<T> | BalancaRepository;
  private isBalanca: boolean;

  constructor(repository: FatoRepository<T> | BalancaRepository) {
    this.repository = repository;
    this.isBalanca = repository instanceof BalancaRepository;
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

    // Combinações base (sem UF/região)
    for (const sh of SH_OPTIONS) {
      combos.push({ year: YEAR, sh });
      combos.push({ year: YEAR, sh, region: null, uf: null, productName: null });
    }

    // Combinações com UFs
    for (const uf of UF_LIST) {
      for (const sh of SH_OPTIONS) {
        combos.push({ year: YEAR, sh, uf, region: null, productName: null });
      }
      combos.push({ year: YEAR, uf }); // Sem SH
    }

    // Combinações com regiões
    for (const region of REGION_LIST) {
      for (const sh of SH_OPTIONS) {
        combos.push({ year: YEAR, sh, region, uf: null, productName: null });
      }
      combos.push({ year: YEAR, region }); // Sem SH
    }

    // Combinações com UF + região
    for (const uf of UF_LIST) {
      for (const region of REGION_LIST) {
        for (const sh of SH_OPTIONS) {
          combos.push({ year: YEAR, sh, uf, region, productName: null });
        }
      }
    }

    return combos;
  }

  public async preloadCache(): Promise<void> {
    const paramCombos = this.buildParamCombos();
    const chunks = this.chunkArray(paramCombos, CONCURRENCY_LIMIT);

    let completed = 0;
    const total = paramCombos.length;

    for (const chunk of chunks) {
      await Promise.all(
        chunk.map(async (params) => {
          const { year, sh, region, productName, uf } = params;

          try {
            if (this.isBalanca) {
              // balancaRepository com novo parâmetro uf
              const balancaRepo = this.repository as BalancaRepository;
              await balancaRepo.getBalancoComercial(
                year,
                NaN,
                uf ?? undefined,
                region ?? undefined,
                sh,
                productName ?? undefined,
              );
              completed++;
            } else {
              // fatoRepository
              const repo = this.repository as FatoRepository<T>;
              const calls = [];

              // Chamadas específicas para UF
              if (uf) {
                calls.push(
                  repo.getVia(year, NaN, uf),
                  repo.getUrf(year, NaN, uf)
                );
              }

              // Chamada principal com SH
              if (sh) {
                calls.push(
                  repo.getAllData({
                    year,
                    endYear: NaN,
                    sh,
                    region: region ?? undefined,
                    productName: productName ?? undefined,
                    uf: uf ?? undefined
                  })
                );
              }

              // Chamada para dados agregados sem filtros específicos
              if (!sh && region === undefined && productName === undefined) {
                calls.push(repo.getFat(year, NaN, uf ?? undefined));
              }

              await Promise.all(calls);
              completed += calls.length;
            }

            console.log(`Progress: ${completed}/${total}`);
          } catch (err) {
            console.error(`Erro ao pré-carregar para:`, params, err);
          }
        })
      );
    }

    console.log('Preload concluído para o ano único.');
  }
}