import express from "express";
import BalancoComerController from "../controller/balanco.controller";

const router = express.Router();
const balancoController = new BalancoComerController();

//Pesquisar balanco comercial por ano
router.get("/:year", balancoController.getBalancoComercialByYear("Balanço comercial por ano."));

export default router;
