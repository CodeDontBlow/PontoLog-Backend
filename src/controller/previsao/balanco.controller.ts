import asyncHandler from "express-async-handler";
import { SuccessResponse } from "../../core/ApiResponse";
import BalancoProphetRepository from "../../database/repository/previsao/BalancoProphetRepository";

export default class BalancaProphetController {
  protected repository: BalancoProphetRepository;

  constructor() {
    this.repository = new BalancoProphetRepository();
  }

  getPrevisoesPorAno = (message: string) =>
    asyncHandler(async (req, res) => {
      const { year } = req.params;
      
      const data = await this.repository.getPrevisoesByYear(Number(year));
      
      new SuccessResponse(message, data).send(res);
    });

  getPrevisoes2026 = (message: string) =>
    asyncHandler(async (req, res) => {
      const data = await this.repository.getPrevisoes2026();
      new SuccessResponse(message, data).send(res);
    });
}