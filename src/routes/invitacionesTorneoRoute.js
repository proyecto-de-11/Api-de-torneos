import { Router } from 'express'; 

import * as initacionesTorneoController from '../controllers/invitacionesTorneoController.js'; 

const router = Router();


router.post('/invitacionesTor', initacionesTorneoController.CreateInvitacionTorneo);
router.put('/invitacionesTor/:id', initacionesTorneoController.updatInvitacionTorneo);
router.get('/invitacionesTor/:torneo_id', initacionesTorneoController.getIvitacionesByTorneo);


export default router;