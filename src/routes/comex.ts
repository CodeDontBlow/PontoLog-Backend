import { Router } from "express";
import ComexController from "../controller/comex.controller";

const router = Router();

// pesquisar produtos
router.get("/product/:entity/:sh/:letter([a-zA-Z]+)", ComexController.getProductByLetter("Produto pela letra."));

// principal fator agregado
router.get("/fat/:entity/:year", ComexController.getFatByYear("Fator agregado por ano."));
router.get("/fat/:entity/:startYear/:endYear", ComexController.getFatByYearRange("Fator agregado de ano até ano."));

// principal produto
router.get("/product/:entity/:sh/:year", ComexController.getProductByYear("Produto por ano."));
router.get("/product/:entity/:sh/:startYear/:endYear", ComexController.getProductByYearRange("Produto de ano até ano."));

// principais vias
router.get("/via/:entity/:year/:applyStateFilter/:state", ComexController.getViaByYear("Vias por ano."));
router.get("/via/:entity/:startYear/:endYear", ComexController.getViaByYearRange("Vias de ano até ano."));

// principais urfs
router.get("/urf/:entity/:year", ComexController.getUrfByYear("Urfs por ano."));
router.get("/urf/:entity/:startYear/:endYear", ComexController.getUrfByYearRange("Urfs de ano até ano."));

// valor agregado
router.get("/vl_agregado/:entity/:year", ComexController.getVlAgregadoByYear("Valor Agregado por ano."));
router.get("/vl_agregado/:entity/:startYear/:endYear", ComexController.getVlAgregadoByYearRange("Valor Agregado de ano até ano."));
router.get("/vl_agregado/:entity/:shType/:year/:productName", ComexController.getVlAgregadoByYearAndProduct("Valor Agregado por ano e produto."));
router.get("/vl_agregado/:entity/:shType/:startYear/:endYear/:productName", ComexController.getVlAgregadoByYearRangeAndProduct("Valor Agregado de ano até ano por produto."));

// kg liquido
router.get("/kg_liquido/:entity/:year", ComexController.getKgLiquidoByYear("Kg líquido por ano."));
router.get("/kg_liquido/:entity/:startYear/:endYear", ComexController.getKgLiquidoByYearRange("Kg líquido de ano até ano."));
router.get("/kg_liquido/:entity/:shType/:year/:productName", ComexController.getKgLiquidoByYearAndProduct("Kg líquido por ano e produto."));
router.get("/kg_liquido/:entity/:shType/:startYear/:endYear/:productName", ComexController.getKgLiquidoByYearRangeAndProduct("Kg líquido de ano até ano por produto."));

// valor fob
router.get("/vl_fob/:entity/:year", ComexController.getVlFobByYear("Valor FOB por ano."));
router.get("/vl_fob/:entity/:startYear/:endYear", ComexController.getVlFobByYearRange("Valor FOB de ano até ano."));
router.get("/vl_fob/:entity/:shType/:year/:productName", ComexController.getVlFobByYearAndProduct("Valor FOB por ano e produto."));
router.get("/vl_fob/:entity/:shType/:startYear/:endYear/:productName", ComexController.getVlFobByYearRangeAndProduct("Valor FOB de ano até ano por produto."));

export default router;