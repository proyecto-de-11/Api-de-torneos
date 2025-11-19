import * as invitacionModel from '../models/invitacionpartido.js';

/**
 * Controlador para la creación de una nueva invitación a partido.
 */
const createInvitacionPartidoController = async (req, res) => {
    const invitationData = req.body;

    try {
        const newInvitationId = await invitacionModel.createInvitacionPartido(invitationData);

        res.status(201).json({ 
            message: 'Invitación a partido enviada exitosamente', 
            invitacionId: newInvitationId 
        });
        
    } catch (error) {
        
        console.error(" ERROR AL CREAR INVITACIÓN :", error);
        
        // Manejo del error de validación del ID
        if (error.code === 'PARTIDO_NO_ENCONTRADO') {
            return res.status(404).json({ 
                message: error.message,
                detail: "El ID proporcionado no corresponde a ningún partido existente."
            });
        }

        // Manejo de otros errores de base de datos
        res.status(500).json({
            message: 'Error al crear la invitación',
            error: error.message,
            detail: "Verifique el error en la terminal de Node.js."
        });
    }
};

/**
 * Controlador para obtener la lista completa de todas las invitaciones a partidos.
 */
const getAllInvitacionesPartidoController = async (req, res) => {
    try {
        // Llamada al método del modelo
        const invitaciones = await invitacionModel.getAllInvitacionesPartido();

        if (invitaciones.length === 0) {
            // 404 Not Found si no hay registros
            return res.status(404).json({ message: 'No se encontraron invitaciones registradas.' });
        }

        // 200 OK
        res.status(200).json({ 
            message: 'Invitaciones obtenidas exitosamente', 
            total: invitaciones.length,
            data: invitaciones 
        });
        
    } catch (error) {
        
        console.error(" ERROR FATAL AL OBTENER INVITACIONES :", error);
        
        // 500 Internal Server Error
        res.status(500).json({
            message: 'Error al obtener la lista de invitaciones',
            error: error.message,
            detail: "Verifique el error en la terminal de Node.js."
        });
    }
};

/**
 * Controlador para obtener una invitación a partido específica por su ID.
 */
const getInvitacionPartidoByIdController = async (req, res) => {
    // Obtener el ID de la invitación desde los parámetros de la ruta
    const invitacionId = req.params.id; 

    // Validación básica
    if (!invitacionId) {
        return res.status(400).json({ message: 'El ID de la invitación es obligatorio.' });
    }

    try {
        // Llamada al método del modelo
        const invitacion = await invitacionModel.getInvitacionPartidoById(invitacionId);

        if (!invitacion) {
            // 404 Not Found si el ID no existe
            return res.status(404).json({ message: `Invitación con ID ${invitacionId} no encontrada.` });
        }

        // 200 OK
        res.status(200).json({ 
            message: 'Invitación obtenida exitosamente', 
            data: invitacion 
        });
        
    } catch (error) {
        
        console.error(` ERROR FATAL AL OBTENER INVITACIÓN (ID: ${invitacionId}) :`, error);
        
        res.status(500).json({
            message: 'Error al obtener la invitación',
            error: error.message,
            detail: "Verifique el error en la terminal de Node.js."
        });
    }
};

/**
 * Controlador para actualizar una invitación a partido existente.
 */
const updateInvitacionPartidoController = async (req, res) => {
    const invitacionId = req.params.id; 
    const invitacionData = req.body; // El modelo se encarga de filtrar los campos

    if (!invitacionId) {
        return res.status(400).json({ message: 'El ID de la invitación es obligatorio para la edición.' });
    }
    
    if (Object.keys(invitacionData).length === 0) {
        return res.status(400).json({ message: 'El cuerpo de la solicitud no puede estar vacío.' });
    }

    try {
        const affectedRows = await invitacionModel.updateInvitacionPartido(invitacionId, invitacionData);

        if (affectedRows === 0) {
            // Esto puede ser si el ID no existe o si no se pasó ningún campo válido para actualizar.
            return res.status(404).json({ message: `Invitación con ID ${invitacionId} no encontrada o no se proporcionaron campos válidos.` });
        }

        // 200 OK
        res.status(200).json({ 
            message: 'Invitación actualizada exitosamente', 
            invitacionId: invitacionId,
            filas_afectadas: affectedRows 
        });
        
    } catch (error) {
        
        console.error(" ERROR FATAL AL ACTUALIZAR INVITACIÓN :", error);
        
        const errorMessage = error.sqlMessage || error.message; 
        
        res.status(500).json({
            message: 'Error al actualizar la invitación',
            error: errorMessage,
            detail: "Verifique el error en la terminal de Node.js."
        });
    }
};

export {
    createInvitacionPartidoController,
    getAllInvitacionesPartidoController,
    getInvitacionPartidoByIdController,
    updateInvitacionPartidoController
};