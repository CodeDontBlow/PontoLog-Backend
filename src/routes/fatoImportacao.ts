import express from "express";
import FatoImportacaoController from "../controller/fato.importacao.controller";

const router = express.Router();
const fatoImportacaoController = new FatoImportacaoController();

// // principal produto - /model/product/no_sh?_por/:year?endYear=2025&uf=SP
router.get("/product/:sh/:year", fatoImportacaoController.getProduct("Produto por ano."));

// principal fator agregado - /model/fat/:year?endYear=2025&uf=SP
router.get("/fat/:year", fatoImportacaoController.getFat("Fator agregado por ano."));

// // principais vias - /model/via/:year?endYear=2025&uf=SP
router.get("/via/:year", fatoImportacaoController.getVia("Vias por ano."));

// principais urfs - /model/urf/:year?endYear=2025&uf=SP
router.get("/urf/:year", fatoImportacaoController.getUrfByYear("Urfs por ano."));

// valor agregado - /model/vl_agregado/:year?endYear=2025&uf=SP&sh=no_sh4_por&productName=...
router.get("/vl_agregado/:year", fatoImportacaoController.getVlAgregado("Valor Agregado por ano."));

// kg liquido - /model/kg_liquido/:year?endYear=2025&uf=SP&sh=no_sh4_por&productName=...
router.get("/kg_liquido/:year", fatoImportacaoController.getKgLiquido("Kg líquido por ano."));

// vl fob - /model/vl_fob/:year?endYear=2025&uf=SP&sh=no_sh4_por&productName=...
router.get("/vl_fob/:year", fatoImportacaoController.getVlFob("Valor FOB por ano."));

router.get("/countries/:year", fatoImportacaoController.getOverallCountries("Todos os dados dos paises"));

router.get("/:year", fatoImportacaoController.getAllData("Todos os dados!"));

export default router;
