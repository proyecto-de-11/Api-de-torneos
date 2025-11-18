import { Router } from 'express'; 
import * as partidoController from '../controllers/partidoController.js';

const router = Router();

router.post('/partido', partidoController.createPartido);

export default router;