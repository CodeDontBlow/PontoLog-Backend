import dimSh from "./dimSh";
import fatoExportacao from "./fatoExportacao";
import balanco from "./balanco";
import express from "express";
import fatoImportacao from "./fatoImportacao";
import news from './news'
import balancoProphet from "./previsao/balancoProphet"
import kgExp from "./previsao/exportacao/kgLiquido"
import vlFobExp from "./previsao/exportacao/vlFob"
import vlAgregadoExp from "./previsao/exportacao/vlAgregado"

const router = express.Router();

router.use(dimSh);
router.use("/importacao", fatoImportacao);
router.use("/exportacao", fatoExportacao);
router.use("/balanco", balanco);
router.use(news)

router.use("/previsoes", balancoProphet);
router.use("/kgExp", kgExp)
router.use("/vlFobExp", vlFobExp)
router.use("/vlAgregadoExp", vlAgregadoExp)
export default router;
