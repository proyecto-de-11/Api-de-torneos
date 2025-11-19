import { Router } from 'express'; 

import * as calificacionController from '../controllers/calificacionController.js'

const router = Router();

router.post('/calificacion', calificacionController.createCalificacionJugadorController);
router.get('/calificacion', calificacionController.getAllCalificacionesJugadorController);
router.get('/calificacion/:id', calificacionController.getCalificacionJugadorByIdController);
router.put('/calificacion/:id', calificacionController.updateCalificacionJugadorController);

export default router;