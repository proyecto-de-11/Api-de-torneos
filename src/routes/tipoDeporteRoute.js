import { Router } from 'express'; // Importamos Router desde express
import multer from 'multer'; // Importamos multer
import path from 'path'; // Importamos path

// Importamos el controlador. Usamos el nombre TipoDeporteController
// y añadimos la extensión .js
import * as TipoDeporteController from '../controllers/tipoDeporteController.js'; 

const router = Router();


router.post('/deporte', TipoDeporteController.createTipoDeport);
router.delete('/deporte/:id', TipoDeporteController.deleteTipoDeport);
router.get('/deporte/buscar', TipoDeporteController.getTipoDeportByName);


export default router;