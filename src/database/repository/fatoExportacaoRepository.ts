import FatoExportacao from "../models/fatoExportacao";
import FatoRepository from "./fatoRepository";

export default class FatoExportacaoRepository<T> extends FatoRepository<T> {
  constructor() {
    super(FatoExportacao);
  }
}
