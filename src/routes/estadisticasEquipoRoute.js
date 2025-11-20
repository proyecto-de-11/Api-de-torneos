import { Router } from 'express'; 

import * as estadisticaEquipoController from '../controllers/estadisticasEsquipoController.js'; 

const router = Router();

router.post('/estadisticaEquipo', estadisticaEquipoController.CrearEstadisticaEquipo)
router.put('/estadisticaEquipo/:id', estadisticaEquipoController.updatEstadisticaEquipo)

export default router;