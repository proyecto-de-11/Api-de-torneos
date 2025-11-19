import { Router } from 'express'; 

import * as calificacionController from '../controllers/calificacionController.js'

const router = Router();

router.post('/calificacion', calificacionController.createCalificacionJugadorController);
router.get('/calificacion', calificacionController.getAllCalificacionesJugadorController);


export default router;