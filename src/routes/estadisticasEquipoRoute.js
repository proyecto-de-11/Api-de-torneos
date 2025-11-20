import { Router } from 'express'; 

import * as estadisticaEquipoController from '../controllers/estadisticasEsquipoController.js'; 

const router = Router();

router.post('/estadisticaEquipo', estadisticaEquipoController.CrearEstadisricaEquipo)

export default router;