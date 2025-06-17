import express from 'express';
import BalancaProphetController from '../../controller/previsao/balanco.controller';

const router = express.Router();
const controller = new BalancaProphetController();

router.get('/:year', controller.getPrevisoesPorAno("Previsões retornadas com sucesso"));

export default router;