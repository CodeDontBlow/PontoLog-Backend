import express from 'express';
import VlAgregadoProphetController from '../../../controller/previsao/exportacao/vlAgregado';


const router = express.Router();
const controller = new VlAgregadoProphetController();

router.get('/:year', controller.getPrevisoesPorAno("Previsões retornadas com sucesso"));

export default router;