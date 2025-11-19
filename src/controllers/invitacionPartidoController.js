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

export {
    createInvitacionPartidoController,
    getAllInvitacionesPartidoController
};