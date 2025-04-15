import { Exportacao } from "../database/models/Exportacao";
import { ExportacaoRepository } from "../database/repository/exportacaoRepository";
import ComexController from "./comex.controller";

export default class ExportacaoController extends ComexController<Exportacao> {
  constructor() {
    super(new ExportacaoRepository());
  }
}
