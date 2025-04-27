import express from "express";
import BalancoComerController from "../controller/balanco_com.controller";

const router = express.Router();
const balancoController = new BalancoComerController();

//Pesquisar balanco comercial por ano
router.get("/balanco_comercial/:year", balancoController.getBalancoComercialByYear("Balanço comercial por ano."));

//Pesquisar balanco comercial pelo mês
router.get("/balanco_comercial/mes/:month", balancoController.getBalancoComercialByMonth("Balanço comercial por mês."));

//Pesquisar balanco comercial de um ano a outro
router.get(
  "/balanco_comercial/:startYear/:endYear",
  balancoController.getBalancoComercialByYearRange("Balanço comercial de um ano a outro."),
);

//Pesquisar balanco comercial de um mês a outro
router.get(
  "/balanco_comercial/mes/:year/:startMonth/:endMonth",
  balancoController.getBalancoComercialByMonthRange("Balanço comercial de um ano a outro de um determinado ano"),
);

export default router;
