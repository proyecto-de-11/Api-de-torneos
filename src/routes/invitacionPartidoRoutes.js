import { Router } from 'express'; 

import * as invitacionPartidoController from '../controllers/invitacionPartidoController.js';

const router = Router();

router.post('/invitacionPartido', invitacionPartidoController.createInvitacionPartidoController);

export default router;