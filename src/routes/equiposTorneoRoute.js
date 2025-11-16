import { Router } from 'express'; 

import * as equiposTorneoController from '../controllers/equiposTorneoController.js'; 

const router = Router();


router.post('/equipoTor', equiposTorneoController.inscribirEquipo);
router.put('/equipoTor/:id', equiposTorneoController.updatequipoTorneo);



export default router;