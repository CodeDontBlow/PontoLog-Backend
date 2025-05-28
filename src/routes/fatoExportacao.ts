import express from "express";
import FatoExportacaoController from "../controller/fato.exportacao.controller";

const router = express.Router();
const fatoExportacaoController = new FatoExportacaoController();

// // principal produto - /model/product/no_sh?_por/:year?endYear=2025&uf=SP
router.get("/product/:sh/:year", fatoExportacaoController.getProduct("Produto por ano."));

// principal fator agregado - /model/fat/:year?endYear=2025&uf=SP
router.get("/fat/:year", fatoExportacaoController.getFat("Fator agregado por ano."));

// vl fob, kg, liquido, vl agreado, vl paises, principais urfs, e principais vias
router.get("/:year", fatoExportacaoController.getAllData(''))

export default router;
