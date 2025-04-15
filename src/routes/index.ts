import exportacao from "./exportacao";
import importacao from "./importacao";
import express from "express";

const router = express.Router();

router.use("/exportacao", exportacao);
router.use("/importacao", importacao);

export default router;
