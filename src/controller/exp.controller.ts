import asyncHandler from "express-async-handler";
import ExportacaoService from "../database/service/exportacao.service";
import { SuccessResponse } from "../core/ApiResponse";

const getProduct = (message: string) =>
  asyncHandler(async (req, res) => {
    const letter = req.params.letter;
    const sh = req.params.sh;
    const data = await ExportacaoService.getProduct(sh, letter);
    new SuccessResponse(message, data).send(res);
  });

const getFatByYear = (message: string) =>
  asyncHandler(async (req, res) => {
    const year = req.params.year;
    const data = await ExportacaoService.getFatByYear(Number(year));
    new SuccessResponse(message, data).send(res);
  });

const getFatByYearRange = (message: string) =>
  asyncHandler(async (req, res) => {
    const startYear = req.params.startYear;
    const endYear = req.params.endYear;
    const data = await ExportacaoService.getFatByYearRange(Number(startYear), Number(endYear));
    new SuccessResponse(message, data).send(res);
  });

const getProductByYear = (message: string) =>
  asyncHandler(async (req, res) => {
    const sh = req.params.sh;
    const year = req.params.year;
    const data = await ExportacaoService.getProductByYear(sh, Number(year));
    new SuccessResponse(message, data).send(res);
  });

const getProductByYearRange = (message: string) =>
  asyncHandler(async (req, res) => {
    const sh = req.params.sh;
    const startYear = req.params.startYear;
    const endYear = req.params.endYear;
    const data = await ExportacaoService.getProductByYearRange(sh, Number(startYear), Number(endYear));
    new SuccessResponse(message, data).send(res);
  });

const getViaByYear = (message: string) =>
  asyncHandler(async (req, res) => {
    const year = req.params.year;
    const data = await ExportacaoService.getViaByYear(Number(year));
    new SuccessResponse(message, data).send(res);
  });

const getViaByYearRange = (message: string) =>
  asyncHandler(async (req, res) => {
    const startYear = req.params.startYear;
    const endYear = req.params.endYear;
    const data = await ExportacaoService.getViaByYearRange(Number(startYear), Number(endYear));
    new SuccessResponse(message, data).send(res);
  });

const getUrfByYear = (message: string) =>
  asyncHandler(async (req, res) => {
    const year = req.params.year;
    const data = await ExportacaoService.getUrfByYear(Number(year));
    new SuccessResponse(message, data).send(res);
  });

const getUrfByYearRange = (message: string) =>
  asyncHandler(async (req, res) => {
    const startYear = req.params.startYear;
    const endYear = req.params.endYear;
    const data = await ExportacaoService.getUrfByYearRange(Number(startYear), Number(endYear));
    new SuccessResponse(message, data).send(res);
  });

const getVlAgregadoByYearAndMonth = (message: string) =>
  asyncHandler(async (req, res) => {
    const year = req.params.year;
    const data = await ExportacaoService.getVlAgregadoByYearAndMonth(Number(year));
    new SuccessResponse(message, data).send(res);
  });

const getVlAgregadoByYear = (message: string) =>
  asyncHandler(async (req, res) => {
    const startYear = req.params.startYear;
    const endYear = req.params.endYear;
    const data = await ExportacaoService.getVlAgregadoByYear(Number(startYear), Number(endYear));
    new SuccessResponse(message, data).send(res);
  });

const getVlAgregadoByYearAndProduct = (message: string) =>
  asyncHandler(async (req, res) => {
    const shType = req.params.shType;
    const year = req.params.year;
    const productName = req.params.productName;
    const data = await ExportacaoService.getVlAgregadoByYearAndProduct(shType, Number(year), productName);
    new SuccessResponse(message, data).send(res);
  });

const getKgLiquidoByYearAndMonth = (message: string) =>
  asyncHandler(async (req, res) => {
    const year = req.params.year;
    const data = await ExportacaoService.getKgLiquidoByYearAndMonth(Number(year));
    new SuccessResponse(message, data).send(res);
  });

const getKgLiquidoByYear = (message: string) =>
  asyncHandler(async (req, res) => {
    const startYear = req.params.startYear;
    const endYear = req.params.endYear;
    const data = await ExportacaoService.getKgLiquidoByYear(Number(startYear), Number(endYear));
    new SuccessResponse(message, data).send(res);
  });

const getKgLiquidoByYearAndProduct = (message: string) =>
  asyncHandler(async (req, res) => {
    const shType = req.params.shType;
    const year = req.params.year;
    const productName = req.params.productName;
    const data = await ExportacaoService.getKgLiquidoByYearAndProduct(shType, Number(year), productName);
    new SuccessResponse(message, data).send(res);
  });

const getVlFobByYearAndMonth = (message: string) =>
  asyncHandler(async (req, res) => {
    const year = req.params.year;
    const data = await ExportacaoService.getVlFobByYearAndMonth(Number(year));
    new SuccessResponse(message, data).send(res);
  });

const getVlFobByYear = (message: string) =>
  asyncHandler(async (req, res) => {
    const startYear = req.params.startYear;
    const endYear = req.params.endYear;
    const data = await ExportacaoService.getVlFobByYear(Number(startYear), Number(endYear));
    new SuccessResponse(message, data).send(res);
  });

const getVlFobByYearAndProduct = (message: string) =>
  asyncHandler(async (req, res) => {
    const shType = req.params.shType;
    const year = req.params.year;
    const productName = req.params.productName;
    const data = await ExportacaoService.getVlFobByYearAndProduct(shType, Number(year), productName);
    new SuccessResponse(message, data).send(res);
  });

  const getVlFobByYearForYearAndProduct = (message: string) =>
    asyncHandler(async (req, res) => {
      const shType = req.params.shType
      const startYear = req.params.startYear
      const endYear = req.params.endYear
      const productName = req.params.productName
      const data= await ExportacaoService.getVlFobByYearForYearAndProduct(shType, Number(startYear), Number(endYear), productName);
      new SuccessResponse(message, data).send(res);
    });

  const getKgLiquidoByYearForYearAndProduct = (message: string) =>
    asyncHandler(async (req, res) => {
      const shType = req.params.shType
      const startYear = req.params.startYear
      const endYear = req.params.endYear
      const productName = req.params.productName
      const data= await ExportacaoService.getKgLiquidoByYearForYearAndProduct(shType, Number(startYear), Number(endYear), productName);
      new SuccessResponse(message, data).send(res);
    })


    const getVlAgregadoByYearForYearAndProduct = (message: string) =>
      asyncHandler(async (req, res) => {
        const shType = req.params.shType
        const startYear = req.params.startYear
        const endYear = req.params.endYear
        const productName = req.params.productName
        const data= await ExportacaoService.getVlAgregadoByYearForYearAndProduct(shType, Number(startYear), Number(endYear), productName);
        new SuccessResponse(message, data).send(res);
      })


const ExpController = {
  getProduct,
  getFatByYear,
  getFatByYearRange,
  getProductByYear,
  getProductByYearRange,
  getViaByYear,
  getViaByYearRange,
  getUrfByYear,
  getUrfByYearRange,
  getVlAgregadoByYearAndMonth,
  getKgLiquidoByYearAndMonth,
  getVlFobByYearAndMonth,
  getVlAgregadoByYear,
  getKgLiquidoByYear,
  getVlFobByYear,
  getVlAgregadoByYearAndProduct,
  getKgLiquidoByYearAndProduct,
  getVlFobByYearAndProduct,
  getVlFobByYearForYearAndProduct,
  getKgLiquidoByYearForYearAndProduct,
  getVlAgregadoByYearForYearAndProduct,
};

export default ExpController;
