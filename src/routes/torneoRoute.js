
import { Router } from 'express'; 
import * as TorneoController from '../controllers/TorneoController.js'; 

const router = Router();


router.post('/torneo', TorneoController.createTorneo);
router.put('/torneo/:id', TorneoController.updateTorneo);
router.delete('/torneo/:id', TorneoController.deleteTorneo);
router.get('/torneo', TorneoController.getAllTorneos);
router.get('/torneo/:id', TorneoController.getTorneoById);
router.get('/torneo/creadopor/:id', TorneoController.getTorneoCreadoById);

export default router;
