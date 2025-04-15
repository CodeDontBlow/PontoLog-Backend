import { Importacao } from "../models/Importacao";
import ComexRepository from "./comexRepository";

export class ImportacaoRepository<T> extends ComexRepository<T> {
  constructor() {
    super(Importacao);
  }
}
