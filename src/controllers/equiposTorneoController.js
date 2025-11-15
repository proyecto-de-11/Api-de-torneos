import * as equipoTorneoModel from '../models/equiposTorneo.js';
import * as torneoModel from '../models/Torneo.js';

const inscribirEquipo = async (req, res) => {
    const {
        torneo_id,
        equipo_id,
        esta_confirmado,
        grupo,
        posicion_grupo,
        posicion_general
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

        const inscripcionData = {
            torneo_id,
            equipo_id,
            esta_confirmado,
            grupo,
            posicion_grupo,
            posicion_general

        };
        const newInscripcionId = await equipoTorneoModel.inscribirEquipoATorneo(inscripcionData);

        res.status(201).json({
            message: 'Equipo inscrito al torneo exitosamente',
            inscripcionId: newInscripcionId
        });

    } catch (error) {
        console.error("❌ ERROR al inscribir equipo ❌:", error);
        res.status(500).json({
            message: 'Error al inscribir el equipo al torneo',
            error: error.message,
        });
    }
};

export {
    inscribirEquipo
};