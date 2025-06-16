import BalancaRepository from '../database/repository/balancaRepository';
import FatoPreloader from './preLoader';
import { fatoImportacaoRepository, fatoExportacaoRepository } from '../database/repository/singletons';

export async function preloadAll(): Promise<void> {
  const preloaderImportacao = new FatoPreloader(fatoImportacaoRepository);
  const preloaderExportacao = new FatoPreloader(fatoExportacaoRepository);
  const preloaderBalanca = new FatoPreloader(new BalancaRepository());

  await Promise.all([
    preloaderImportacao.preloadCache(),
    preloaderExportacao.preloadCache(),
    preloaderBalanca.preloadCache(),
  ]);

  console.log('Preload completo para todos os repositórios.');
}
