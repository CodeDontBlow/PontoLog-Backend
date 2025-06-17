import express from 'express';
import KgLiquidoProphetController from '../../../controller/previsao/exportacao/kgLiquido';

const router = express.Router();
const controller = new KgLiquidoProphetController();

router.get('/:year', controller.getPrevisoesPorAno("Previsões retornadas com sucesso"));

export default router;