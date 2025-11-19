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

export {
    createCalificacionJugadorController
};