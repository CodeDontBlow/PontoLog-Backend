import express from 'express';
import VlFobProphetController from '../../../controller/previsao/exportacao/vlFob';


const router = express.Router();
const controller = new VlFobProphetController();

router.get('/:year', controller.getPrevisoesPorAno("Previsões retornadas com sucesso"));

export default router;