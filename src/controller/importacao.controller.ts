import { Importacao } from "../database/models/Importacao";
import { ImportacaoRepository } from "../database/repository/importacaoRepository";
import ComexController from "./comex.controller";

export default class ImportacaoController extends ComexController<Importacao> {
  constructor() {
    super(new ImportacaoRepository());
  }
}
