import * as invitacionesTorneoModel from '../models/invitacionesTorneo.js';

import * as torneoModel from '../models/Torneo.js';

const CreateInvitacionTorneo = async (req, res) => {
    const {
        torneo_id, 
        equipo_id, 
        usuario_remitente_id, 
        usuario_respondio_id ,
        mensaje ,
        estado
    } = req.body;
    if (!torneo_id || !equipo_id) {
        return res.status(400).json({ message: 'El ID del torneo y el ID del equipo son obligatorios.' });
    }

    try {
        const torneoExistente = await torneoModel.getTorneoById(torneo_id);

        if (!torneoExistente) {
            return res.status(404).json({ message: 'Torneo no encontrado.' });
        }

        if (torneoExistente.estado !== 'inscripciones_abiertas') {
            return res.status(403).json({ message: `Inscripciones cerradas para el torneo: ${torneoExistente.nombre}. Estado actual: ${torneoExistente.estado}` });
        }

        const invitacionTorData = {
        torneo_id, 
        equipo_id, 
        usuario_remitente_id, 
        usuario_respondio_id ,
        mensaje ,
        estado
        };
        const newInvitacionTorneoId = await invitacionesTorneoModel.CreateInvitacionTorneo(invitacionTorData);

        res.status(201).json({
            message: 'Invitacion de equipo al torneo exitosamente',
            invitacionTorId: newInvitacionTorneoId
        });

    } catch (error) {
        console.error("❌ ERROR al invitar equipo ❌:", error);
        res.status(500).json({
            message: 'Error al invitar el equipo al torneo',
            error: error.message,
        });
    }
};


export {
   CreateInvitacionTorneo
};