import { ImpRes } from "../database/models/ImpRes";
import { ImpResRepository } from "../database/repository/impResRepository";
import ComexController from "./comex.controller";

export default class ImpResController extends ComexController<ImpRes> {
  constructor() {
    super(new ImpResRepository());
  }
}