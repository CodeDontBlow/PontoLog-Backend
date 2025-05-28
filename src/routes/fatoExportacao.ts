import express from "express";
import FatoExportacaoController from "../controller/fato.exportacao.controller";

const router = express.Router();
const fatoExportacaoController = new FatoExportacaoController();

// // principal produto - /model/product/no_sh?_por/:year?endYear=2025&uf=SP
router.get("/product/:sh/:year", fatoExportacaoController.getProduct("Produto por ano."));

// principal fator agregado - /model/fat/:year?endYear=2025&uf=SP
router.get("/fat/:year", fatoExportacaoController.getFat("Fator agregado por ano."));

// // principais vias - /model/via/:year?endYear=2025&uf=SP
router.get("/via/:year", fatoExportacaoController.getVia("Vias por ano."));

// principais urfs - /model/urf/:year?endYear=2025&uf=SP
router.get("/urf/:year", fatoExportacaoController.getUrfByYear("Urfs por ano."));

// valor agregado - /model/vl_agregado/:year?endYear=2025&uf=SP&sh=no_sh4_por&productName=...
router.get("/vl_agregado/:year", fatoExportacaoController.getVlAgregado("Valor Agregado por ano."));

// kg liquido - /model/kg_liquido/:year?endYear=2025&uf=SP&sh=no_sh4_por&productName=...
router.get("/kg_liquido/:year", fatoExportacaoController.getKgLiquido("Kg líquido por ano."));

// vl fob - /model/vl_fob/:year?endYear=2025&uf=SP&sh=no_sh4_por&productName=...
router.get("/vl_fob/:year", fatoExportacaoController.getVlFob("Valor FOB por ano."));

// valores de paises
router.get("/countries/:year", fatoExportacaoController.getOverallCountries("Todos os dados dos paises"));

// vl fob, kg, liquido, vl agreado, vl paises, principais urfs, e principais vias
router.get("/:year", fatoExportacaoController.getAllData(''))

export default router;
