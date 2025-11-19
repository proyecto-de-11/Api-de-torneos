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

export {
    createCalificacionJugadorController,
    getAllCalificacionesJugadorController
};