import { Router } from 'express'; 

import * as patrocinadoresController from '../controllers/patrocinadoresController.js'; 

const router = Router();


router.post('/patrocinadorTor', patrocinadoresController.inscribirPatrocinadorATorneo);
router.put('/patrocinadorTor/:id', patrocinadoresController.updatePatrocinadorTorneo);



export default router;