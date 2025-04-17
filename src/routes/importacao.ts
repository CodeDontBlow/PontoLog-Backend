import express from "express";
import ImportacaoController from "../controller/importacao.controller";

const router = express.Router();
const importacaoController = new ImportacaoController();

// pesquisar produtos
router.get("/product/:sh/:letter([a-zA-Z]+)", importacaoController.getProductByLetter("Produto pela letra."));

// principal produto
router.get("/product/:sh/:year", importacaoController.getProductByYear("Produto por ano."));
router.get("/product/:sh/:startYear/:endYear", importacaoController.getProductByYearRange("Produto de ano até ano."));

// principal fator agregado
router.get("/fat/:year", importacaoController.getFatByYear("Fator agregado por ano."));
router.get("/fat/:startYear/:endYear", importacaoController.getFatByYearRange("Fator agregado de ano até ano."));

// principais vias
router.get("/via/:year", importacaoController.getViaByYear("Vias por ano."));
router.get("/via/:startYear/:endYear", importacaoController.getViaByYearRange("Vias de ano até ano."));

// principais urfs
router.get("/urf/:year", importacaoController.getUrfByYear("Urfs por ano."));
router.get("/urf/:startYear/:endYear", importacaoController.getUrfByYearRange("Urfs de ano até ano."));

// valor agregado
router.get("/vl_agregado/:year", importacaoController.getVlAgregadoByYear("Valor Agregado por ano."));
router.get("/vl_agregado/:startYear/:endYear", importacaoController.getVlAgregadoByYearRange("Valor Agregado de ano até ano."));
router.get("/vl_agregado/:sh/:year/:productName", importacaoController.getVlAgregadoByYearAndProduct("Valor Agregado por ano e produto."));
router.get(
  "/vl_agregado/:sh/:startYear/:endYear/:productName",
  importacaoController.getVlAgregadoByYearRangeAndProduct("Valor Agregado de ano até ano por produto."),
);

// kg liquido
router.get("/kg_liquido/:year", importacaoController.getKgLiquidoByYear("Kg líquido por ano."));
router.get("/kg_liquido/:startYear/:endYear", importacaoController.getKgLiquidoByYearRange("Kg líquido de ano até ano."));
router.get("/kg_liquido/:sh/:year/:productName", importacaoController.getKgLiquidoByYearAndProduct("Kg líquido por ano e produto."));
router.get(
  "/kg_liquido/:sh/:startYear/:endYear/:productName",
  importacaoController.getKgLiquidoByYearRangeAndProduct("Kg líquido de ano até ano por produto."),
);

// valor fob
router.get("/vl_fob/:year", importacaoController.getVlFobByYear("Valor FOB por ano."));
router.get("/vl_fob/:startYear/:endYear", importacaoController.getVlFobByYearRange("Valor FOB de ano até ano."));
router.get("/vl_fob/:sh/:year/:productName", importacaoController.getVlFobByYearAndProduct("Valor FOB por ano e produto."));
router.get("/vl_fob/:sh/:startYear/:endYear/:productName", importacaoController.getVlFobByYearRangeAndProduct("Valor FOB de ano até ano por produto."));
export default router;
