import FatoController from "./fato.controller";
import FatoImportacaoRepository from "../database/repository/fatoImportacaoRepository";
import FatoImportacao from "../database/models/fatoImportacao";

export default class FatoImportacaoController extends FatoController<FatoImportacao> {
  constructor() {
    super(new FatoImportacaoRepository());
  }
}
