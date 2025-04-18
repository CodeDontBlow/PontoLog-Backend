import { ExpRes } from "../models/ExpRes";
import ComexRepository from "./comexRepository";

export class ExpResRepository<T> extends ComexRepository<T> {
  constructor() {
    super(ExpRes);
  }
}
