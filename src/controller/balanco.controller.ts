import asyncHandler from "express-async-handler";
import { SuccessResponse } from "../core/ApiResponse";
import BalancoRepository from "../database/repository/balancaRepository";

export default class BalancaController {
  protected repository: BalancoRepository;

  constructor() {
    this.repository = new BalancoRepository
  }
  getBalancoComercialByYear = (message: string) =>
    asyncHandler(async (req, res) => {
      const { year } = req.params;
      const region = req.query.region as string
      const uf = req.query.uf as string
      const sh = req.query.sh as string;
      const productName = req.query.productName as string;
      const endYear = req.query.endYear as string
      const data = await this.repository.getBalancoComercialByYear(Number(year), Number(endYear), uf, region, sh, productName);
      new SuccessResponse(message, data).send(res);
    });

}
