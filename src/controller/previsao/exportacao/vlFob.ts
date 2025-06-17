import asyncHandler from "express-async-handler";
import { SuccessResponse } from "../../../core/ApiResponse";
import VlFobProphetRepository from "../../../database/repository/previsao/exportacao/vlFob";

export default class VlFobProphetController {
  protected repository: VlFobProphetRepository;

  constructor() {
    this.repository = new VlFobProphetRepository();
  }

  getPrevisoesPorAno = (message: string) =>
    asyncHandler(async (req, res) => {
      const { year } = req.params;
      
      const data = await this.repository.getPrevisoesByYear(Number(year));
      
      new SuccessResponse(message, data).send(res);
    });
}