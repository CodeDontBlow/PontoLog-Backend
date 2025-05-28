import express from "express";
import FatoImportacaoController from "../controller/fato.importacao.controller";

const router = express.Router();
const fatoImportacaoController = new FatoImportacaoController();

// // principal produto - /model/product/no_sh?_por/:year?endYear=2025&uf=SP
router.get("/product/:sh/:year", fatoImportacaoController.getProduct("Produto por ano."));

// principal fator agregado - /model/fat/:year?endYear=2025&uf=SP
router.get("/fat/:year", fatoImportacaoController.getFat("Fator agregado por ano."));

// vl fob, kg, liquido, vl agreado, vl paises, principais urfs, e principais vias
router.get("/:year", fatoImportacaoController.getAllData(''))

export default router
