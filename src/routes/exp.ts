import { Router } from "express";
import ExpController from "../controller/exp.controller";

const router = Router();
router.get("/product/:sh/:letter([a-zA-Z]+)", ExpController.getProduct("Produto do letra"));

//principal fator agregado
router.get("/fat/:year", ExpController.getFatByYear("Fator agregado por ano!"));
router.get("/fat/:startYear/:endYear", ExpController.getFatByYearRange("Fator agreagado de ano até ano!"));

//principal produto
router.get("/product/:sh/year/:year", ExpController.getProductByYear("Produto por ano!"));
router.get("/product/:sh/:startYear/:endYear", ExpController.getProductByYearRange("Produto de ano até ano!"));

//principais vias
router.get("/via/:year", ExpController.getViaByYear("Vias por ano"))
export default router;
