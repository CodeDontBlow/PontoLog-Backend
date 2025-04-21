import express from "express";
import ImportacaoController from "../controller/importacao.controller";
import ImpResController from "../controller/impRes.controller";

const router = express.Router();
const importacaoController = new ImportacaoController();
const impResController = new ImpResController();

// pesquisar produtos
router.get("/product/:sh/:letter([a-zA-Z]+)", impResController.getProductByLetter("Produto pela letra."));

// principal produto
router.get("/product/:sh/:year", impResController.getProductByYear("Produto por ano."));
router.get("/product/:sh/:startYear/:endYear", impResController.getProductByYearRange("Produto de ano até ano."));

// principal fator agregado
router.get("/fat/:year", impResController.getFatByYear("Fator agregado por ano."));
router.get("/fat/:startYear/:endYear", impResController.getFatByYearRange("Fator agregado de ano até ano."));

// principais vias
router.get("/via/:year", impResController.getViaByYear("Vias por ano."));
router.get("/via/:startYear/:endYear", impResController.getViaByYearRange("Vias de ano até ano."));

// principais urfs
router.get("/urf/:year", impResController.getUrfByYear("Urfs por ano."));
router.get("/urf/:startYear/:endYear", impResController.getUrfByYearRange("Urfs de ano até ano."));

// valor agregado
router.get("/vl_agregado/:year", importacaoController.getVlAgregadoByYear("Valor Agregado por ano."));
router.get("/vl_agregado/:startYear/:endYear", impResController.getVlAgregadoByYearRange("Valor Agregado de ano até ano."));
router.get("/vl_agregado/:sh/:year/:productName", importacaoController.getVlAgregadoByYearAndProduct("Valor Agregado por ano e produto."));
router.get("/vl_agregado/:sh/:startYear/:endYear/:productName", impResController.getVlAgregadoByYearRangeAndProduct("Valor Agregado de ano até ano por produto."));

// kg liquido
router.get("/kg_liquido/:year", importacaoController.getKgLiquidoByYear("Kg líquido por ano."));
router.get("/kg_liquido/:startYear/:endYear", impResController.getKgLiquidoByYearRange("Kg líquido de ano até ano."));
router.get("/kg_liquido/:sh/:year/:productName", importacaoController.getKgLiquidoByYearAndProduct("Kg líquido por ano e produto."));
router.get("/kg_liquido/:sh/:startYear/:endYear/:productName",
  impResController.getKgLiquidoByYearRangeAndProduct("Kg líquido de ano até ano por produto."));

// valor fob
router.get("/vl_fob/:year", importacaoController.getVlFobByYear("Valor FOB por ano."));
router.get("/vl_fob/:startYear/:endYear", impResController.getVlFobByYearRange("Valor FOB de ano até ano."));
router.get("/vl_fob/:sh/:year/:productName", importacaoController.getVlFobByYearAndProduct("Valor FOB por ano e produto."));
router.get("/vl_fob/:sh/:startYear/:endYear/:productName", impResController.getVlFobByYearRangeAndProduct("Valor FOB de ano até ano por produto."));

// valores de paises
router.get("/countries/:year", importacaoController.getOverallCountriesByYear("Todos os dados dos paises"))
router.get("/countries/:startYear/:endYear", importacaoController.getOverallCountriesByYearRange("Todos os dados dos paises de ano até ano"))
router.get("/countries/:shType/:year/:productName", importacaoController.getOverallCountriesByYearAndProduct("Todos os dados dos paises em um ano único e produto"))
router.get("/countries/:shType/:startYear/:endYear/:productName", importacaoController.getOverallCountriesByYearRangeAndProduct("Todos os dados dos paises em um ano único e produto"))


export default router;
