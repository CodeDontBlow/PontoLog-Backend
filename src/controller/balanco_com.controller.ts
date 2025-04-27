import asyncHandler from "express-async-handler";
import { SuccessResponse } from "../core/ApiResponse";
import BalancoRepository from "../database/repository/balanco/BalancoRepository";
import BalancoComercial from "../database/models/balanco/BalancoComercial";

export default class BalancoComerController {
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

  getBalancoComercialByYearRange = (message: string) =>
    asyncHandler(async (req, res) => {
      const { startYear, endYear } = req.params;
      const uf = req.query.uf as string;
      const data = await this.repository.getBalancoComercialByYearRange(Number(startYear), Number(endYear), uf);
      new SuccessResponse(message, data).send(res);
    });

  getBalancoComercialByMonth = (message: string) =>
    asyncHandler(async (req, res) => {
      const { month } = req.params;
      const uf = req.query.uf as string;
      const data = await this.repository.getBalancoComercialByMonth(Number(month), uf);
      new SuccessResponse(message, data).send(res);
    });

  getBalancoComercialByMonthRange = (message: string) =>
    asyncHandler(async (req, res) => {
      const { year, startMonth, endMonth } = req.params;
      const uf = req.query.uf as string;

      const rawData = await this.repository.getBalancoComercialByMonthRange(
        Number(year),
        Number(startMonth),
        Number(endMonth),
        uf,
      );

      const data = {
        [year]: rawData.reduce(
          (acc, item) => {
            acc[item.mes] = Number(item.balanca_comercial);
            return acc;
          },
          {} as Record<number, number>,
        ),
      };

      new SuccessResponse(message, data).send(res);
    });
}
