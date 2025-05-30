import FatoImportacaoRepository from '../database/repository/fatoImportacaoRepository';
import FatoExportacaoRepository from '../database/repository/fatoExportacaoRepository';
import FatoPreloader from '../database/repository/fatoPreLoader';

export async function preloadAll(): Promise<void> {
  const importacaoRepo = new FatoImportacaoRepository();
  const exportacaoRepo = new FatoExportacaoRepository();

  const preloaderImportacao = new FatoPreloader(importacaoRepo);
  const preloaderExportacao = new FatoPreloader(exportacaoRepo);

  await Promise.all([
    preloaderImportacao.preloadCache(),
    preloaderExportacao.preloadCache(),
  ]);

  console.log('Preload completo para todos os repositórios.');
}
