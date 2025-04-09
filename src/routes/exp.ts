import { Router } from "express";
import ExpController from "../controller/exp.controller";

const router = Router();
//pesquisar produtos
router.get("/product/:sh/:letter([a-zA-Z]+)", ExpController.getProduct("Produto do letra."));

//principal fator agregado
router.get("/fat/:year", ExpController.getFatByYear("Fator agregado por ano."));
router.get("/fat/:startYear/:endYear", ExpController.getFatByYearRange("Fator agreagado de ano até ano."));

//principal produto
router.get("/product/:sh/year/:year", ExpController.getProductByYear("Produto por ano."));
router.get("/product/:sh/:startYear/:endYear", ExpController.getProductByYearRange("Produto de ano até ano."));

//principais vias
router.get("/via/:year", ExpController.getViaByYear("Vias por ano"));
router.get("/via/:startYear/:endYear", ExpController.getViaByYearRange("Vias de ano até ano."));

//principais urfs
router.get("/urf/:year", ExpController.getUrfByYear("Urfs por ano"));
router.get("/urf/:startYear/:endYear", ExpController.getUrfByYearRange("Urfs de ano até ano."));

//vl_agregado
router.get("/vl_agregado/:year", ExpController.getVlAgregadoByYearAndMonth("Valor Agregado por ano e mes"));
router.get("/vl_agregado/:startYear/:endYear", ExpController.getVlAgregadoByYear("Valor Agregado de ano até ano"));

//kg_liquido
router.get("/kg_liquido/:year", ExpController.getKgLiquidoByYearAndMonth("Kg liquido por ano e mes"));
router.get("/kg_liquido/:startYear/:endYear", ExpController.getKgLiquidoByYear("Kg liquido por ano até ano"));

//vl_fob 
router.get("/vl_fob/:year", ExpController.getVlFobByYearAndMonth("Valor fob por ano e mes"));
router.get("/vl_fob/:startYear/:endYear", ExpController.getVlFobByYear("Valor fob por ano até ano"));

export default router;
