import FatoController from "./fato.controller";
import FatoImportacao from "../database/models/fatoImportacao";
import { fatoExportacaoRepository, fatoImportacaoRepository } from "../database/repository/singletons";

export default class FatoImportacaoController extends FatoController<FatoImportacao> {
  constructor() {
    super(fatoImportacaoRepository);
  }
}
