import asyncHandler from "express-async-handler";
import { SuccessResponse } from "../core/ApiResponse";
import FatoRepository from "../database/repository/fatoRepository";

export default abstract class FatoController<T> {
  protected repository: FatoRepository<T>;

  constructor(repository: FatoRepository<T>) {
    this.repository = repository;
  }

  getFat = (message: string) =>
    asyncHandler(async (req, res) => {
      const { year } = req.params;
      const endYear = req.query.endYear as string;
      const uf = req.query.uf as string;
      const data = await this.repository.getFat(Number(year), Number(endYear), uf);
      new SuccessResponse(message, data).send(res);
    });

  getProduct = (message: string) =>
    asyncHandler(async (req, res) => {
      const { sh, year } = req.params;
      const endYear = req.query.endYear as string;
      const uf = req.query.uf as string;
      const data = await this.repository.getProduct(sh, Number(year), Number(endYear), uf);
      new SuccessResponse(message, data).send(res);
    });

  getVia = (message: string) =>
    asyncHandler(async (req, res) => {
      const { year } = req.params;
      const endYear = req.query.endYear as string;
      const uf = req.query.uf as string;
      const data = await this.repository.getVia(Number(year), Number(endYear), uf);
      new SuccessResponse(message, data).send(res);
    });

  getUrfByYear = (message: string) =>
    asyncHandler(async (req, res) => {
      const { year } = req.params;
      const endYear = req.query.endYear as string;
      const uf = req.query.uf as string;
      const data = await this.repository.getUrf(Number(year), Number(endYear), uf);
      new SuccessResponse(message, data).send(res);
    });

  getVlAgregado = (message: string) =>
    asyncHandler(async (req, res) => {
      const { year } = req.params;
      const endYear = req.query.endYear as string;
      const uf = req.query.uf as string;
      const region = req.query.region as string;
      const sh = req.query.sh as string;
      const productName = req.query.productName as string;
      const data = await this.repository.getVlAgregado(Number(year), Number(endYear), uf, region, sh, productName);
      new SuccessResponse(message, data).send(res);
    });

  getKgLiquido = (message: string) =>
    asyncHandler(async (req, res) => {
      const { year } = req.params;
      const endYear = req.query.endYear as string;
      const uf = req.query.uf as string;
      const region = req.query.region as string;
      const sh = req.query.sh as string;
      const productName = req.query.productName as string;
      const data = await this.repository.getKgLiquido(Number(year), Number(endYear), uf, region, sh, productName);
      new SuccessResponse(message, data).send(res);
    });

  getVlFob = (message: string) =>
    asyncHandler(async (req, res) => {
      const { year } = req.params;
      const endYear = req.query.endYear as string;
      const uf = req.query.uf as string;
      const region = req.query.region as string;
      const sh = req.query.sh as string;
      const productName = req.query.productName as string;
      const data = await this.repository.getVlFob(Number(year), Number(endYear), uf, region, sh, productName);
      new SuccessResponse(message, data).send(res);
    });

  getOverallCountries = (message: string) =>
    asyncHandler(async (req, res) => {
      const { year } = req.params;
      const endYear = req.query.endYear as string;
      const uf = req.query.uf as string;
      const sh = req.query.sh as string;
      const region = req.query.region as string
      const productName = req.query.productName as string;
      const data = await this.repository.getOverallCountries(Number(year), Number(endYear), uf,region, sh, productName);
      new SuccessResponse(message, data).send(res);
    });

  getAllData = (message: string) =>
    asyncHandler(async (req, res) => {
      const { year } = req.params;

      const endYear = req.query.endYear ? Number(req.query.endYear) : undefined;
      const uf = req.query.uf as string | undefined;
      const region = req.query.region as string | undefined;

      const data = await this.repository.getAllData({
        year: Number(year),
        endYear: Number(endYear),
        uf,
        region,
      });

    new SuccessResponse(message, data).send(res);
  });

}