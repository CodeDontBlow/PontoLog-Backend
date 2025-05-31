import FatoPreloader from '../database/repository/fatoPreLoader';
import {fatoImportacaoRepository} from '../database/./repository/singletons'
import {fatoExportacaoRepository} from '../database/./repository/singletons'

export async function preloadAll(): Promise<void> {

  const preloaderImportacao = new FatoPreloader(fatoImportacaoRepository);
  const preloaderExportacao = new FatoPreloader(fatoExportacaoRepository);

  await Promise.all([
    preloaderImportacao.preloadCache(),
    preloaderExportacao.preloadCache(),
  ]);

  console.log('Preload completo para todos os repositórios.');
}
