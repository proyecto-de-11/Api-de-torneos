import { Router } from 'express'; 

import * as initacionesTorneoController from '../controllers/invitacionesTorneoController.js'; 

const router = Router();


router.post('/invitacionesTor', initacionesTorneoController.CreateInvitacionTorneo);


export default router;