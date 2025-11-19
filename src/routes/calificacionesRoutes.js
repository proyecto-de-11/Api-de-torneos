import { Router } from 'express'; 

import * as calificacionController from '../controllers/calificacionController.js'

const router = Router();

router.post('/calificacion', calificacionController.createCalificacionJugadorController);

export default router;