import asyncHandler from "express-async-handler";
import { SuccessResponse } from "../core/ApiResponse";
import BalancoRepository from "../database/repository/BalancoRepository";
import BalancoComercial from "../database/models/BalancoComercial";

export default class BalancoComerController{
    protected repository: BalancoRepository;
    

    constructor() {
      this.repository = new BalancoRepository(BalancoComercial);
    }


    getBalancoComercialByYear = (message: string) =>
        asyncHandler(async (req, res) => {
          const { year } = req.params;
          const uf = req.query.uf as string;
          const data = await this.repository.getBalancoComercialByYear(Number(year), uf);
          new SuccessResponse(message, data).send(res);
        });
}