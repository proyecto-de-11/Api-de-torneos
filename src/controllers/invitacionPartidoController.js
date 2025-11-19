import * as invitacionModel from '../models/invitacionpartido.js';


/**
 * Controlador para la creación de una nueva invitación a partido.
 */
const createInvitacionPartidoController = async (req, res) => {
    
    // Desestructuración de los datos del body (POST)
    const { 
        partido_id, 
        equipo_invitado_id, 
        usuario_invito_id, 
        mensaje
    } = req.body;

    //  Validación de campos obligatorios (asumiendo que estos son necesarios)
    if (!partido_id || !equipo_invitado_id) {
        return res.status(400).json({ message: 'El ID del partido y el ID del equipo invitado son obligatorios.' });
    }

    //  Objeto de datos para enviar al modelo
    const invitationData = {
        partido_id, 
        equipo_invitado_id, 
        usuario_invito_id, 
        mensaje
    };

    try {
      
        //  Llamar al método del modelo
        const newInvitationId = await invitacionModel.createInvitacionPartido(invitationData);

        //  Respuesta exitosa (201 Created)
        res.status(201).json({ 
            message: 'Invitación a partido enviada exitosamente', 
            invitacionId: newInvitationId 
        });
        
    } catch (error) {
        
        //  Manejo de errores
        console.error(" ERROR FATAL CAPTURADO :", error);
        
        res.status(500).json({
            message: 'Error al crear la invitación',
            error: error.message,
            detail: "Verifique el error en la terminal de Node.js."
        });
    }
};

export {
    createInvitacionPartidoController
};