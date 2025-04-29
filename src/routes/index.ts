import dimSh from "./dimSh";
import fatoExportacao from "./fatoExportacao";
import balanco from "./balanco";
import express from "express";
import fatoImportacao from "./fatoImportacao";

const router = express.Router();

router.use(dimSh);
router.use("/importacao", fatoImportacao);
router.use("/exportacao", fatoExportacao);
router.use("/balanco", balanco);

export default router;
