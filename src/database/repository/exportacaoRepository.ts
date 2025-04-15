import ComexRepository from "./comexRepository";
import { Exportacao } from "../models/Exportacao";

export class ExportacaoRepository<T> extends ComexRepository<T> {
  constructor() {
    super(Exportacao);
  }
}
