import { Router } from 'express'; 

import * as equiposTorneoController from '../controllers/equiposTorneoController.js'; 

const router = Router();


router.post('/equipoTor', equiposTorneoController.inscribirEquipo);
router.put('/equipoTor/:id', equiposTorneoController.updatequipoTorneo);
router.delete('/equipoTor/:id', equiposTorneoController.deleteEquipoTorneo);



export default router;