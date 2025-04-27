import express from "express";
import DimShController from "../controller/dim.sh.controller";

const router = express.Router();
const dimShController = new DimShController();

router.get("/product/:sh/:letter([a-zA-Z]+)", dimShController.getProductByLetter("Produto pela letra."));

export default router;
