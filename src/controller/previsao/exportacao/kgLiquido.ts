import asyncHandler from "express-async-handler";
import { SuccessResponse } from "../../../core/ApiResponse";
import KgLiquidoProphetRepository from "../../../database/repository/previsao/exportacao/kgLiquido";

export default class KgLiquidoProphetController {
  protected repository: KgLiquidoProphetRepository;

  constructor() {
    this.repository = new KgLiquidoProphetRepository();
  }

  getPrevisoesPorAno = (message: string) =>
    asyncHandler(async (req, res) => {
      const { year } = req.params;
      
      const data = await this.repository.getPrevisoesByYear(Number(year));
      
      new SuccessResponse(message, data).send(res);
    });
}