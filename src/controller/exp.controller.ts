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
    const sh = req.params.sh
    const year = req.params.year;
    const data = await ExportacaoService.getProductByYear(sh, Number(year));
    new SuccessResponse(message, data).send(res);
  });

const getProductByYearRange = (message: string) =>
  asyncHandler(async (req, res) => {
    const sh = req.params.sh
    const startYear = req.params.startYear;
    const endYear = req.params.endYear;
    const data = await ExportacaoService.getProductByYearRange(sh, Number(startYear), Number(endYear));
    new SuccessResponse(message, data).send(res);
  });

const ExpController = { getProduct, getFatByYear, getFatByYearRange, getProductByYear, getProductByYearRange };
export default ExpController;
