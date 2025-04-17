import asyncHandler from "express-async-handler";
import { SuccessResponse } from "../core/ApiResponse";
import ComexRepository from "../database/repository/comexRepository";

export default abstract class ComexController<T> {
  protected repository: ComexRepository<T>;

  constructor(repository: ComexRepository<T>) {
    this.repository = repository;
  }

  getProductByLetter = (message: string) =>
    asyncHandler(async (req, res) => {
      const { letter, sh } = req.params;
      const data = await this.repository.getProductByLetter(sh, letter);
      new SuccessResponse(message, data).send(res);
    });

  getFatByYear = (message: string) =>
    asyncHandler(async (req, res) => {
      const { year } = req.params;
      const uf = req.query.uf as string;
      const data = await this.repository.getFatByYear(Number(year), uf);
      new SuccessResponse(message, data).send(res);
    });

    getFatByYearRange = (message: string) =>
      asyncHandler(async (req, res) => {
        const { startYear, endYear } = req.params;
        const uf = req.query.uf as string;
        const data = await this.repository.getFatByYearRange(Number(startYear), Number(endYear), uf);
        new SuccessResponse(message, data).send(res);
      });
    
    getProductByYear = (message: string) =>
      asyncHandler(async (req, res) => {
        const { sh, year } = req.params;
        const uf = req.query.uf as string;
        const data = await this.repository.getProductByYear(sh, Number(year), uf);
        new SuccessResponse(message, data).send(res);
      });
    
    getProductByYearRange = (message: string) =>
      asyncHandler(async (req, res) => {
        const { sh, startYear, endYear } = req.params;
        const uf = req.query.uf as string;
        const data = await this.repository.getProductByYearRange(sh, Number(startYear), Number(endYear), uf);
        new SuccessResponse(message, data).send(res);
      });
    
    getViaByYear = (message: string) =>
      asyncHandler(async (req, res) => {
        const { year } = req.params;
        const uf = req.query.uf as string;
        const data = await this.repository.getViaByYear(Number(year), uf);
        new SuccessResponse(message, data).send(res);
      });
    
    getViaByYearRange = (message: string) =>
      asyncHandler(async (req, res) => {
        const { startYear, endYear } = req.params;
        const uf = req.query.uf as string;
        const data = await this.repository.getViaByYearRange(Number(startYear), Number(endYear), uf);
        new SuccessResponse(message, data).send(res);
      });
    
    getUrfByYear = (message: string) =>
      asyncHandler(async (req, res) => {
        const { year } = req.params;
        const uf = req.query.uf as string;
        const data = await this.repository.getUrfByYear(Number(year), uf);
        new SuccessResponse(message, data).send(res);
      });
    
    getUrfByYearRange = (message: string) =>
      asyncHandler(async (req, res) => {
        const { startYear, endYear } = req.params;
        const uf = req.query.uf as string;
        const data = await this.repository.getUrfByYearRange(Number(startYear), Number(endYear), uf);
        new SuccessResponse(message, data).send(res);
      });
    
    getVlAgregadoByYear = (message: string) =>
      asyncHandler(async (req, res) => {
        const { year } = req.params;
        const uf = req.query.uf as string;
        const data = await this.repository.getVlAgregadoByYear(Number(year), uf);
        new SuccessResponse(message, data).send(res);
      });
    
    getVlAgregadoByYearRange = (message: string) =>
      asyncHandler(async (req, res) => {
        const { startYear, endYear } = req.params;
        const uf = req.query.uf as string;
        const data = await this.repository.getVlAgregadoByYearRange(Number(startYear), Number(endYear), uf);
        new SuccessResponse(message, data).send(res);
      });
    
    getVlAgregadoByYearAndProduct = (message: string) =>
      asyncHandler(async (req, res) => {
        const { shType, year, productName } = req.params;
        const uf = req.query.uf as string;
        const data = await this.repository.getVlAgregadoByYearAndProduct(shType, Number(year), productName, uf);
        new SuccessResponse(message, data).send(res);
      });
    
    getVlAgregadoByYearRangeAndProduct = (message: string) =>
      asyncHandler(async (req, res) => {
        const { shType, startYear, endYear, productName } = req.params;
        const uf = req.query.uf as string;
        const data = await this.repository.getVlAgregadoByYearRangeAndProduct(shType, Number(startYear), Number(endYear), productName, uf);
        new SuccessResponse(message, data).send(res);
      });
    
    getKgLiquidoByYear = (message: string) =>
      asyncHandler(async (req, res) => {
        const { year } = req.params;
        const uf = req.query.uf as string;
        const data = await this.repository.getKgLiquidoByYear(Number(year), uf);
        new SuccessResponse(message, data).send(res);
      });
    
    getKgLiquidoByYearRange = (message: string) =>
      asyncHandler(async (req, res) => {
        const { startYear, endYear } = req.params;
        const uf = req.query.uf as string;
        const data = await this.repository.getKgLiquidoByYearRange(Number(startYear), Number(endYear), uf);
        new SuccessResponse(message, data).send(res);
      });
    
    getKgLiquidoByYearAndProduct = (message: string) =>
      asyncHandler(async (req, res) => {
        const { shType, year, productName } = req.params;
        const uf = req.query.uf as string;
        const data = await this.repository.getKgLiquidoByYearAndProduct(shType, Number(year), productName, uf);
        new SuccessResponse(message, data).send(res);
      });
    
    getKgLiquidoByYearRangeAndProduct = (message: string) =>
      asyncHandler(async (req, res) => {
        const { shType, startYear, endYear, productName } = req.params;
        const uf = req.query.uf as string;
        const data = await this.repository.getKgLiquidoByYearRangeAndProduct(shType, Number(startYear), Number(endYear), productName, uf);
        new SuccessResponse(message, data).send(res);
      });
    
    getVlFobByYear = (message: string) =>
      asyncHandler(async (req, res) => {
        const { year } = req.params;
        const uf = req.query.uf as string;
        const data = await this.repository.getVlFobByYear(Number(year), uf);
        new SuccessResponse(message, data).send(res);
      });
    
    getVlFobByYearRange = (message: string) =>
      asyncHandler(async (req, res) => {
        const { startYear, endYear } = req.params;
        const uf = req.query.uf as string;
        const data = await this.repository.getVlFobByYearRange(Number(startYear), Number(endYear), uf);
        new SuccessResponse(message, data).send(res);
      });
    
    getVlFobByYearAndProduct = (message: string) =>
      asyncHandler(async (req, res) => {
        const { shType, year, productName } = req.params;
        const uf = req.query.uf as string;
        const data = await this.repository.getVlFobByYearAndProduct(shType, Number(year), productName, uf);
        new SuccessResponse(message, data).send(res);
      });
    
    getVlFobByYearRangeAndProduct = (message: string) =>
      asyncHandler(async (req, res) => {
        const { shType, startYear, endYear, productName } = req.params;
        const uf = req.query.uf as string;
        const data = await this.repository.getVlFobByYearRangeAndProduct(shType, Number(startYear), Number(endYear), productName, uf);
        new SuccessResponse(message, data).send(res);
      });

    getOverallCountriesByYear = (message: string) =>
      asyncHandler(async (req, res) => {
        const { year } = req.params;
        const uf = req.query.uf as string;
        const data = await this.repository.getOverallCountriesByYear(Number(year), uf);
        new SuccessResponse(message, data).send(res);
      });
   
    getOverallCountriesByYearRange = (message: string) =>
      asyncHandler(async (req, res) => {
        const { startYear, endYear } = req.params;
        const uf = req.query.uf as string;
        const data = await this.repository.getOverallCountriesByYearRange(Number(startYear), Number(endYear), uf);
        new SuccessResponse(message, data).send(res);  // 46.36 s - 48.22 s
      });

    getOverallCountriesByYearAndProduct = (message: string) =>
      asyncHandler(async (req, res) => {
        const { year, shType, productName} = req.params;
        const uf = req.query.uf as string;
        const data = await this.repository.getOverallCountriesByYearAndProduct(Number(year), shType, productName, uf);
        new SuccessResponse(message, data).send(res);
      });

    getOverallCountriesByYearRangeAndProduct = (message: string) =>
      asyncHandler(async (req, res) => {
        const { startYear, endYear, shType, productName} = req.params;
        const uf = req.query.uf as string;
        const data = await this.repository.getOverallCountriesByYearRangeAndProduct(Number(startYear), Number(endYear), shType, productName, uf);
        new SuccessResponse(message, data).send(res);
      });
}    