import exportacao from "./exportacao";
import importacao from "./importacao";
import balanco from "./balanco";
import express from "express";

const router = express.Router();

router.use("/exportacao", exportacao);
router.use("/importacao", importacao);
router.use("/balanco", balanco);

export default router;
