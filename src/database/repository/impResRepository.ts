import { ImpRes } from "../models/ImpRes";
import ComexRepository from "./comexRepository";

export class ImpResRepository<T> extends ComexRepository<T> {
  constructor() {
    super(ImpRes);
  }
}