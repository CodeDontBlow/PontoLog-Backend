import FatoExportacaoRepository from './fatoExportacaoRepository';
import FatoExportacao from '../models/fatoExportacao';
import FatoImportacaoRepository from './fatoImportacaoRepository';
import FatoImportacao from '../models/fatoImportacao';

export const fatoExportacaoRepository = new FatoExportacaoRepository<FatoExportacao>();
export const fatoImportacaoRepository = new FatoImportacaoRepository<FatoImportacao>();