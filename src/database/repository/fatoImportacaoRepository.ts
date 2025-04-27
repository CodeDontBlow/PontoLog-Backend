import FatoImportacao from "../models/fatoImportacao";
import FatoRepository from "./fatoRepository";

export default class FatoImportacaoRepository<T> extends FatoRepository<T> {
  constructor() {
    super(FatoImportacao);
  }
}