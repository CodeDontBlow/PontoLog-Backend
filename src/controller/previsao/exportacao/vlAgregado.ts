import asyncHandler from "express-async-handler";
import { SuccessResponse } from "../../../core/ApiResponse";
import VlAgregadoProphetRepository from "../../../database/repository/previsao/exportacao/vlAgregado";

export default class VlAgregadoProphetController {
  protected repository: VlAgregadoProphetRepository;

  constructor() {
    this.repository = new VlAgregadoProphetRepository();
  }

  getPrevisoesPorAno = (message: string) =>
    asyncHandler(async (req, res) => {
      const { year } = req.params;
      
      const data = await this.repository.getPrevisoesByYear(Number(year));
      
      new SuccessResponse(message, data).send(res);
    });
}