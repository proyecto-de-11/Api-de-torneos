import { Router } from 'express'; 

import * as invitacionPartidoController from '../controllers/invitacionPartidoController.js';

const router = Router();

router.post('/invitacionPartido', invitacionPartidoController.createInvitacionPartidoController);
router.get('/invitacionPartido', invitacionPartidoController.getAllInvitacionesPartidoController);
router.get('/invitacionPartido/:id', invitacionPartidoController.getInvitacionPartidoByIdController);


export default router;