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
export default router;
