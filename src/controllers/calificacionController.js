import * as calificacionModel from '../models/calificaciones.js'; 

/**
 * Controlador para crear una nueva calificación de jugador.
 */
const createCalificacionJugadorController = async (req, res) => {
    
    const { 
        partido_id, 
        evaluador_id, 
        jugador_evaluado_id, 
        puntuacion,
        habilidades // Puede venir como array en JSON
    } = req.body;

    // 1. Validación de campos obligatorios
    if (!partido_id || !evaluador_id || !jugador_evaluado_id || !puntuacion) {
        return res.status(400).json({ 
            message: 'Los campos partido_id, evaluador_id, jugador_evaluado_id y puntuacion son obligatorios.' 
        });
    }

    // 2. Validación básica de puntuación (aunque la DB tiene CHECK)
    const score = parseFloat(puntuacion);
    if (isNaN(score) || score < 1 || score > 5) {
         return res.status(400).json({ 
            message: 'La puntuación debe ser un número entre 1.0 y 5.0.' 
        });
    }

    try {
        const newCalificacionId = await calificacionModel.createCalificacionJugador(req.body);

        res.status(201).json({ 
            message: 'Calificación de jugador registrada exitosamente', 
            calificacionId: newCalificacionId 
        });
        
    } catch (error) {
        
        console.error(" ERROR AL CREAR CALIFICACIÓN :", error);
        
        // Manejo de errores específicos del modelo
        if (error.code === 'PARTIDO_NO_ENCONTRADO') {
            return res.status(404).json({ message: error.message });
        }
        if (error.code === 'CALIFICACION_DUPLICADA') {
            return res.status(409).json({ message: error.message }); // 409 Conflict
        }
        if (error.code === 'ER_CHECK_CONSTRAINT_VIOLATED') {
            return res.status(400).json({ message: error.message });
        }
        
        res.status(500).json({
            message: 'Error al registrar la calificación',
            error: error.message
        });
    }
};

/**
 * Controlador para obtener la lista completa de todas las calificaciones de jugadores.
 */
const getAllCalificacionesJugadorController = async (req, res) => {
    try {
        // Llamada al método del modelo
        const calificaciones = await calificacionModel.getAllCalificacionesJugador();

        if (calificaciones.length === 0) {
            // Si la consulta devuelve un array vacío
            return res.status(404).json({ message: 'No se encontraron calificaciones registradas.' });
        }

        // 200 OK
        res.status(200).json({ 
            message: 'Calificaciones obtenidas exitosamente', 
            total: calificaciones.length,
            data: calificaciones 
        });
        
    } catch (error) {
        
        console.error(" ERROR FATAL AL OBTENER CALIFICACIONES :", error);
        
        // 500 Internal Server Error
        res.status(500).json({
            message: 'Error al obtener la lista de calificaciones',
            error: error.message,
            detail: "Verifique el error en la terminal de Node.js."
        });
    }
};

/**
 * Controlador para obtener una calificación de jugador específica por su ID.
 */
const getCalificacionJugadorByIdController = async (req, res) => {
    // Obtener el ID de la calificación desde los parámetros de la ruta
    const calificacionId = req.params.id; 

    // Validación básica
    if (!calificacionId) {
        return res.status(400).json({ message: 'El ID de la calificación es obligatorio.' });
    }

    try {
        // Llamada al método del modelo
        const calificacion = await calificacionModel.getCalificacionJugadorById(calificacionId);

        if (!calificacion) {
            // 404 Not Found si el ID no existe
            return res.status(404).json({ message: `Calificación con ID ${calificacionId} no encontrada.` });
        }

        // 200 OK
        res.status(200).json({ 
            message: 'Calificación obtenida exitosamente', 
            data: calificacion 
        });
        
    } catch (error) {
        
        console.error(` ERROR FATAL AL OBTENER CALIFICACIÓN (ID: ${calificacionId}) :`, error);
        
        res.status(500).json({
            message: 'Error al obtener la calificación',
            error: error.message,
            detail: "Verifique el error en la terminal de Node.js."
        });
    }
};

/**
 * Controlador para actualizar una calificación de jugador existente.
 */
const updateCalificacionJugadorController = async (req, res) => {
    const calificacionId = req.params.id; 
    const calificacionData = req.body; // El modelo se encarga de filtrar los campos

    if (!calificacionId) {
        return res.status(400).json({ message: 'El ID de la calificación es obligatorio para la edición.' });
    }
    
    if (Object.keys(calificacionData).length === 0) {
        return res.status(400).json({ message: 'El cuerpo de la solicitud no puede estar vacío.' });
    }

    // Opcional: Validación extra para puntuación si está presente en el body
    if (calificacionData.puntuacion !== undefined) {
         const score = parseFloat(calificacionData.puntuacion);
         if (isNaN(score) || score < 1 || score > 5) {
             return res.status(400).json({ 
                message: 'La puntuación debe ser un número entre 1.0 y 5.0.' 
            });
         }
    }

    try {
        const affectedRows = await calificacionModel.updateCalificacionJugador(calificacionId, calificacionData);

        if (affectedRows === 0) {
            return res.status(404).json({ message: `Calificación con ID ${calificacionId} no encontrada o no se proporcionaron campos válidos.` });
        }

        // 200 OK
        res.status(200).json({ 
            message: 'Calificación actualizada exitosamente', 
            calificacionId: calificacionId,
            filas_afectadas: affectedRows 
        });
        
    } catch (error) {
        
        console.error(" ERROR FATAL AL ACTUALIZAR CALIFICACIÓN :", error);
        
        // Manejar el error de puntuación fuera de rango capturado en el modelo
        if (error.message.includes('puntuación debe estar entre')) {
             return res.status(400).json({ message: error.message });
        }
        
        const errorMessage = error.sqlMessage || error.message; 
        
        res.status(500).json({
            message: 'Error al actualizar la calificación',
            error: errorMessage,
            detail: "Verifique el error en la terminal de Node.js."
        });
    }
};

export {
    createCalificacionJugadorController,
    getAllCalificacionesJugadorController,
    getCalificacionJugadorByIdController,
    updateCalificacionJugadorController
};