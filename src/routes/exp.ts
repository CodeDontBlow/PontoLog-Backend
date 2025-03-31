import { Router } from "express";
import ExpController from "../controller/exp.controller";

const router = Router();
router.get("/product/:sh/:letter([a-zA-Z]+)", ExpController.getProduct("Produto do letra"));

//principal fator agregado
router.get("/fat:year", ExpController.getFatByYear("Fator agregado por ano!"));
router.get("/fat/:startYear/:endYear", ExpController.getFatByYearRange("Fator agreagado de ano até ano!"));

//principal produto
router.get("/product/:sh/year/:year", ExpController.getProductByYear("Dados por ano!"));
router.get("/product/:sh/:startYear/:endYear", ExpController.getProductByYearRange("Dados de ano até ano!"));

export default router;
