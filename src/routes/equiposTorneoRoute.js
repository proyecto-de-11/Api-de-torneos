import { Router } from 'express'; 

import * as equiposTorneoController from '../controllers/equiposTorneoController.js'; 

const router = Router();


router.post('/equipoTor', equiposTorneoController.inscribirEquipo);


export default router;