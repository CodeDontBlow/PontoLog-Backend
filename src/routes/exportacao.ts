import express from "express";
import ExportacaoController from "../controller/exportacao.controller";

const router = express.Router();
const exportacaoController = new ExportacaoController();

// pesquisar produtos
router.get("/product/:sh/:letter([a-zA-Z]+)", exportacaoController.getProductByLetter("Produto pela letra."));

// principal produto
router.get("/product/:sh/:year", exportacaoController.getProductByYear("Produto por ano."));
router.get("/product/:sh/:startYear/:endYear", exportacaoController.getProductByYearRange("Produto de ano até ano."));

// principal fator agregado ---- p/ pesquisar por estado: /fat/2022?uf=SP
router.get("/fat/:year", exportacaoController.getFatByYear("Fator agregado por ano."));
router.get("/fat/:startYear/:endYear", exportacaoController.getFatByYearRange("Fator agregado de ano até ano."));

// principais vias
router.get("/via/:year", exportacaoController.getViaByYear("Vias por ano."));
router.get("/via/:startYear/:endYear", exportacaoController.getViaByYearRange("Vias de ano até ano."));

// principais urfs
router.get("/urf/:year", exportacaoController.getUrfByYear("Urfs por ano."));
router.get("/urf/:startYear/:endYear", exportacaoController.getUrfByYearRange("Urfs de ano até ano."));

// valor agregado
router.get("/vl_agregado/:year", exportacaoController.getVlAgregadoByYear("Valor Agregado por ano."));
router.get("/vl_agregado/:startYear/:endYear", exportacaoController.getVlAgregadoByYearRange("Valor Agregado de ano até ano."));
router.get("/vl_agregado/:sh/:year/:productName", exportacaoController.getVlAgregadoByYearAndProduct("Valor Agregado por ano e produto."));
router.get(
  "/vl_agregado/:sh/:startYear/:endYear/:productName",
  exportacaoController.getVlAgregadoByYearRangeAndProduct("Valor Agregado de ano até ano por produto."),
);

// kg liquido
router.get("/kg_liquido/:year", exportacaoController.getKgLiquidoByYear("Kg líquido por ano."));
router.get("/kg_liquido/:startYear/:endYear", exportacaoController.getKgLiquidoByYearRange("Kg líquido de ano até ano."));
router.get("/kg_liquido/:sh/:year/:productName", exportacaoController.getKgLiquidoByYearAndProduct("Kg líquido por ano e produto."));
router.get(
  "/kg_liquido/:sh/:startYear/:endYear/:productName",
  exportacaoController.getKgLiquidoByYearRangeAndProduct("Kg líquido de ano até ano por produto."),
);

// valor fob
router.get("/vl_fob/:year", exportacaoController.getVlFobByYear("Valor FOB por ano."));
router.get("/vl_fob/:startYear/:endYear", exportacaoController.getVlFobByYearRange("Valor FOB de ano até ano."));
router.get("/vl_fob/:sh/:year/:productName", exportacaoController.getVlFobByYearAndProduct("Valor FOB por ano e produto."));
router.get("/vl_fob/:sh/:startYear/:endYear/:productName", exportacaoController.getVlFobByYearRangeAndProduct("Valor FOB de ano até ano por produto."));
export default router;
