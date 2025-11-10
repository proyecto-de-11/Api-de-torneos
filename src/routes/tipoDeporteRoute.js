import { Router } from 'express'; // Importamos Router desde express
import multer from 'multer'; // Importamos multer
import path from 'path'; // Importamos path

// Importamos el controlador. Usamos el nombre TipoDeporteController
// y añadimos la extensión .js
import * as TipoDeporteController from '../controllers/tipoDeporteController.js'; 

const router = Router();

// Nota: Dado que estás usando `import * as TipoDeporteController` en el routes
// y el controller exporta con nombre (`export { createTipoDeport }`),
// debes acceder a la función como TipoDeporteController.createTipoDeport.

router.post('/deporte', TipoDeporteController.createTipoDeport);

export default router;