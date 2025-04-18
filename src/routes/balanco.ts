import express from "express";
import BalancoComerController from "../controller/balanco_com.controller";


const router = express.Router();
const balancoController = new BalancoComerController();


//Pesquisar balanco comercial
router.get("/balanco_comercial/:year", balancoController.getBalancoComercialByYear("Balanço comercial por ano."));


export default router;