import asyncHandler from "express-async-handler";
import { SuccessResponse } from "../core/ApiResponse";
import DimShRepository from "../database/repository/dimShRepository";

export default class DimShController {
  private dimShRepo = new DimShRepository();

  getProductByLetter = (message: string) =>
    asyncHandler(async (req, res) => {
      const { letter, sh } = req.params;
      const data = await this.dimShRepo.getProductByLetter(sh, letter);
      new SuccessResponse(message, data).send(res);
    });
}
