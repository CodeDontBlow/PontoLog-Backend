import express from "express";
import ExpController from "../controller/exportacao.controller";
import ExpResController from "../controller/expRes.controller";

const router = express.Router();
const exportacaoController = new ExpController();
const expResController = new ExpResController();

//pesquisar por estado utilize ?uf=SP
// pesquisar produtos

router.get("/product/:sh/:letter([a-zA-Z]+)", expResController.getProductByLetter("Produto pela letra."));

// principal produto
router.get("/product/:sh/:year", expResController.getProductByYear("Produto por ano."));
router.get("/product/:sh/:startYear/:endYear", expResController.getProductByYearRange("Produto de ano até ano."));

// principal fator agregado
router.get("/fat/:year", expResController.getFatByYear("Fator agregado por ano."));
router.get("/fat/:startYear/:endYear", expResController.getFatByYearRange("Fator agregado de ano até ano."));

// principais vias
router.get("/via/:year", expResController.getViaByYear("Vias por ano."));
router.get("/via/:startYear/:endYear", expResController.getViaByYearRange("Vias de ano até ano."));

// principais urfs
router.get("/urf/:year", expResController.getUrfByYear("Urfs por ano."));
router.get("/urf/:startYear/:endYear", expResController.getUrfByYearRange("Urfs de ano até ano."));

// valor agregado
router.get("/vl_agregado/:year", exportacaoController.getVlAgregadoByYear("Valor Agregado por ano."));
router.get("/vl_agregado/:startYear/:endYear", expResController.getVlAgregadoByYearRange("Valor Agregado de ano até ano."));
router.get("/vl_agregado/:sh/:year/:productName", exportacaoController.getVlAgregadoByYearAndProduct("Valor Agregado por ano e produto."));
router.get("/vl_agregado/:sh/:startYear/:endYear/:productName", expResController.getVlAgregadoByYearRangeAndProduct("Valor Agregado de ano até ano por produto."),

// kg liquido
router.get("/kg_liquido/:year", exportacaoController.getKgLiquidoByYear("Kg líquido por ano."));
router.get("/kg_liquido/:startYear/:endYear", expResController.getKgLiquidoByYearRange("Kg líquido de ano até ano."));
router.get("/kg_liquido/:sh/:year/:productName", exportacaoController.getKgLiquidoByYearAndProduct("Kg líquido por ano e produto."));
router.get("/kg_liquido/:sh/:startYear/:endYear/:productName", expResController.getKgLiquidoByYearRangeAndProduct("Kg líquido de ano até ano por produto."),


// valor fob
router.get("/vl_fob/:year", exportacaoController.getVlFobByYear("Valor FOB por ano."));
router.get("/vl_fob/:startYear/:endYear", expResController.getVlFobByYearRange("Valor FOB de ano até ano."));
router.get("/vl_fob/:sh/:year/:productName", exportacaoController.getVlFobByYearAndProduct("Valor FOB por ano e produto."));
router.get("/vl_fob/:sh/:startYear/:endYear/:productName", expResController.getVlFobByYearRangeAndProduct("Valor FOB de ano até ano por produto."));

// valores de paises
router.get("/countries/:year", exportacaoController.getOverallCountriesByYear("Todos os dados dos paises"))
router.get("/countries/:startYear/:endYear", exportacaoController.getOverallCountriesByYearRange("Todos os dados dos paises de ano até ano"))
router.get("/countries/:shType/:year/:productName", exportacaoController.getOverallCountriesByYearAndProduct("Todos os dados dos paises em um ano único e produto"))
router.get("/countries/:shType/:startYear/:endYear/:productName", exportacaoController.getOverallCountriesByYearRangeAndProduct("Todos os dados dos paises em um ano único e produto"))

export default router;
