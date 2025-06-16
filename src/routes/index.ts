import dimSh from "./dimSh";
import fatoExportacao from "./fatoExportacao";
import balanco from "./balanco";
import express from "express";
import fatoImportacao from "./fatoImportacao";
import news from './news'

const router = express.Router();

router.use(dimSh);
router.use("/importacao", fatoImportacao);
router.use("/exportacao", fatoExportacao);
router.use("/balanco", balanco);
router.use(news)
export default router;
