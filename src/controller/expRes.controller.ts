import { ExpRes } from "../database/models/ExpRes";
import { ExpResRepository } from "../database/repository/expResRespository";
import ComexController from "./comex.controller";

export default class ExpResController extends ComexController<ExpRes> {
  constructor() {
    super(new ExpResRepository());
  }
}
