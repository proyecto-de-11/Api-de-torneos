import { Router } from 'express'; 
import * as partidoController from '../controllers/partidoController.js';

const router = Router();

router.post('/partido', partidoController.createPartido);

router.put('/partido/:id', partidoController.updatePartidoController);


export default router;