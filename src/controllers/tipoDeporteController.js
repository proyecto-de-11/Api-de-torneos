// Archivo: ../controllers/tipoDeporteController.js

import * as deporteModel from '../models/tipoDeporte.js';

const createTipoDeport = async (req, res) => {
    // 1. Desestructuración de los datos del body, asignando NULL por defecto
    const { 
        nombre, 
        descripcion = null, // Se asigna null si no viene en el body
        icono = null,       // Se asigna null si no viene en el body
        esta_activo 
    } = req.body;

    // 2. Conversión a 1 o 0 para MySQL TINYINT(1) / BOOLEAN
    const isActiveValue = esta_activo ? 1 : 0; // Garantiza un 1 o 0

    if (!nombre) {
        return res.status(400).json({ message: 'Nombre del deporte es obligatorio' });
    }

    try {
        // 3. Intenta crear el deporte (SIN VALIDACIÓN PREVIA)
        const newDeporteId = await deporteModel.createTipoDeport({
            nombre,
            descripcion,
            icono,
            // Usa el valor convertido (1 o 0)
            esta_activo: isActiveValue 
        });

        // 4. Si llega aquí, todo está bien y se envía la respuesta.
        res.status(201).json({ message: 'Deporte creado exitosamente', deporteId: newDeporteId });
    } catch (error) {
        // 5. Si hay un error (ej. duplicado por la restricción UNIQUE de SQL, o cualquier otro error de DB)
        console.error("❌❌ ERROR FATAL CAPTURADO ❌❌:", error);
        
        // Es crucial devolver la respuesta para que Postman termine de cargar.
        res.status(500).json({
            message: 'Error al crear el deporte',
            error: error.message,
            detail: "Verifique el error en la terminal de Node.js."
        });
    }
};

export {
    createTipoDeport
};