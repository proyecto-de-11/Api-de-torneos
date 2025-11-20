import { Router } from 'express'; 

import * as estadisticaEquipoController from '../controllers/estadisticasEsquipoController.js'; 

const router = Router();

router.post('/estadisticaEquipo', estadisticaEquipoController.CrearEstadisticaEquipo)
router.put('/estadisticaEquipo/:id', estadisticaEquipoController.updatEstadisticaEquipo)
router.delete('/estadisticaEquipo/:id', estadisticaEquipoController.deleteEstadisticaEquipo)
router.get('/estadisticaEquipo', estadisticaEquipoController.getAllEstadisticasEquipos)

export default router;