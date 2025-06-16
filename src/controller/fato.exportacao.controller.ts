import { fatoExportacaoRepository } from '../database/repository/singletons';
import FatoExportacao from '../database/models/fatoExportacao';
import FatoController from './fato.controller';

export default class FatoExportacaoController extends FatoController<FatoExportacao> {
  constructor() {
    super(fatoExportacaoRepository);
  }
}