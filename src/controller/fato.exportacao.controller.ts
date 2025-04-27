import FatoController from "./fato.controller";
import FatoExportacaoRepository from "../database/repository/fatoExportacaoRepository";
import FatoExportacao from "../database/models/fatoExportacao";

export default class FatoExportacaoController extends FatoController<FatoExportacao> {
  constructor() {
    super(new FatoExportacaoRepository());
  }
}
