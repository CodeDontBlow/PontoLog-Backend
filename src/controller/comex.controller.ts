import asyncHandler from "express-async-handler";
import ComexService from "../database/service/comex.service";
import { SuccessResponse } from "../core/ApiResponse";

const getProductByLetter = (message: string) =>
  asyncHandler(async (req, res) => {
    const { entity, letter, sh } = req.params;
    const data = await ComexService.getProductByLetter(entity, sh, letter);
    new SuccessResponse(message, data).send(res);
  });

const getFatByYear = (message: string) =>
  asyncHandler(async (req, res) => {
    const { entity, year } = req.params;
    const data = await ComexService.getFatByYear(entity, Number(year));
    new SuccessResponse(message, data).send(res);
  });

const getFatByYearRange = (message: string) =>
  asyncHandler(async (req, res) => {
    const { entity, startYear, endYear } = req.params;
    const data = await ComexService.getFatByYearRange(entity, Number(startYear), Number(endYear));
    new SuccessResponse(message, data).send(res);
  });

const getProductByYear = (message: string) =>
  asyncHandler(async (req, res) => {
    const { entity, sh, year } = req.params;
    const data = await ComexService.getProductByYear(entity, sh, Number(year));
    new SuccessResponse(message, data).send(res);
  });

const getProductByYearRange = (message: string) =>
  asyncHandler(async (req, res) => {
    const { entity, sh, startYear, endYear } = req.params;
    const data = await ComexService.getProductByYearRange(entity, sh, Number(startYear), Number(endYear));
    new SuccessResponse(message, data).send(res);
  });

const getViaByYear = (message: string) =>
  asyncHandler(async (req, res) => {
    const { entity, year, applyStateFilter, state } = req.params;
    const data = await ComexService.getViaByYear(entity, Number(year), applyStateFilter == 'true', state);
    new SuccessResponse(message, data).send(res);
  });

const getViaByYearRange = (message: string) =>
  asyncHandler(async (req, res) => {
    const { entity, startYear, endYear } = req.params;
    const data = await ComexService.getViaByYearRange(entity, Number(startYear), Number(endYear));
    new SuccessResponse(message, data).send(res);
  });

const getUrfByYear = (message: string) =>
  asyncHandler(async (req, res) => {
    const { entity, year } = req.params;
    const data = await ComexService.getUrfByYear(entity, Number(year));
    new SuccessResponse(message, data).send(res);
  });

const getUrfByYearRange = (message: string) =>
  asyncHandler(async (req, res) => {
    const { entity, startYear, endYear } = req.params;
    const data = await ComexService.getUrfByYearRange(entity, Number(startYear), Number(endYear));
    new SuccessResponse(message, data).send(res);
  });

const getVlAgregadoByYear = (message: string) =>
  asyncHandler(async (req, res) => {
    const { entity, year } = req.params;
    const data = await ComexService.getVlAgregadoByYear(entity, Number(year));
    new SuccessResponse(message, data).send(res);
  });

const getVlAgregadoByYearRange = (message: string) =>
  asyncHandler(async (req, res) => {
    const { entity, startYear, endYear } = req.params;
    const data = await ComexService.getVlAgregadoByYearRange(entity, Number(startYear), Number(endYear));
    new SuccessResponse(message, data).send(res);
  });

const getVlAgregadoByYearAndProduct = (message: string) =>
  asyncHandler(async (req, res) => {
    const { entity, shType, year, productName } = req.params;
    const data = await ComexService.getVlAgregadoByYearAndProduct(entity, shType, Number(year), productName);
    new SuccessResponse(message, data).send(res);
  });

  const getVlAgregadoByYearRangeAndProduct = (message: string) =>
    asyncHandler(async (req, res) => {
      const { entity, shType, startYear, endYear, productName } = req.params;
      const data = await ComexService.getVlAgregadoByYearRangeAndProduct(entity, shType, Number(startYear), Number(endYear), productName);
      new SuccessResponse(message, data).send(res);
    });

const getKgLiquidoByYear = (message: string) =>
  asyncHandler(async (req, res) => {
    const { entity, year } = req.params;
    const data = await ComexService.getKgLiquidoByYear(entity, Number(year));
    new SuccessResponse(message, data).send(res);
  });

const getKgLiquidoByYearRange = (message: string) =>
  asyncHandler(async (req, res) => {
    const { entity, startYear, endYear } = req.params;
    const data = await ComexService.getKgLiquidoByYearRange(entity, Number(startYear), Number(endYear));
    new SuccessResponse(message, data).send(res);
  });

const getKgLiquidoByYearAndProduct = (message: string) =>
  asyncHandler(async (req, res) => {
    const { entity, shType, year, productName } = req.params;
    const data = await ComexService.getKgLiquidoByYearAndProduct(entity, shType, Number(year), productName);
    new SuccessResponse(message, data).send(res);
  });

  const getKgLiquidoByYearRangeAndProduct = (message: string) =>
    asyncHandler(async (req, res) => {
      const { entity, shType, startYear, endYear, productName } = req.params;
      const data = await ComexService.getKgLiquidoByYearRangeAndProduct(entity, shType, Number(startYear), Number(endYear), productName);
      new SuccessResponse(message, data).send(res);
    });

const getVlFobByYear = (message: string) =>
  asyncHandler(async (req, res) => {
    const { entity, year } = req.params;
    const data = await ComexService.getVlFobByYear(entity, Number(year));
    new SuccessResponse(message, data).send(res);
  });

const getVlFobByYearRange = (message: string) =>
  asyncHandler(async (req, res) => {
    const { entity, startYear, endYear } = req.params;
    const data = await ComexService.getVlFobByYearRange(entity, Number(startYear), Number(endYear));
    new SuccessResponse(message, data).send(res);
  });

const getVlFobByYearAndProduct = (message: string) =>
  asyncHandler(async (req, res) => {
    const { entity, shType, year, productName } = req.params;
    const data = await ComexService.getVlFobByYearAndProduct(entity, shType, Number(year), productName);
    new SuccessResponse(message, data).send(res);
  });

const getVlFobByYearRangeAndProduct = (message: string) =>
  asyncHandler(async (req, res) => {
    const { entity, shType, startYear, endYear, productName } = req.params;
    const data = await ComexService.getVlFobByYearRangeAndProduct(entity, shType, Number(startYear), Number(endYear), productName);
    new SuccessResponse(message, data).send(res);
  });

const ComexController = {
  getProductByLetter,
  getFatByYear,
  getFatByYearRange,
  getProductByYear,
  getProductByYearRange,
  getViaByYear,
  getViaByYearRange,
  getUrfByYear,
  getUrfByYearRange,
  getVlAgregadoByYear,
  getKgLiquidoByYear,
  getVlFobByYear,
  getVlAgregadoByYearRange,
  getKgLiquidoByYearRange,
  getVlFobByYearRange,
  getVlAgregadoByYearAndProduct,
  getKgLiquidoByYearAndProduct,
  getVlFobByYearAndProduct,
  getVlFobByYearRangeAndProduct,
  getKgLiquidoByYearRangeAndProduct,
  getVlAgregadoByYearRangeAndProduct,
};

export default ComexController;