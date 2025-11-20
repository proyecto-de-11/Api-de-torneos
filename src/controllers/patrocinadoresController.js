import * as patrocinadorTorneoModel from '../models/patrocinadores.js';
import * as torneoModel from '../models/Torneo.js';

const inscribirPatrocinadorATorneo = async (req, res) => {
    const {
        torneo_id, 
        empresa_id, 
        nivel_patrocinio, 
        monto_aportado ,
        logo ,
        enlace_web,
        descripcion
    } = req.body;
    if (!torneo_id || !empresa_id) {
        return res.status(400).json({ message: 'El ID del torneo y el ID de la emmpresa son obligatorios.' });
    }

    try {
        const torneoExistente = await torneoModel.getTorneoById(torneo_id);

        if (!torneoExistente) {
            return res.status(404).json({ message: 'Torneo no encontrado.' });
        }

        const inscripcionData = {
            torneo_id, 
        empresa_id, 
        nivel_patrocinio, 
        monto_aportado ,
        logo ,
        enlace_web,
        descripcion

        };
        const newInscripcionId = await patrocinadorTorneoModel.inscribirPatrocinadorATorneo(inscripcionData);

        res.status(201).json({
            message: 'patrocinador inscrito al torneo exitosamente',
            inscripcionId: newInscripcionId
        });

    } catch (error) {
        console.error("❌ ERROR al inscribir patrocindor ❌:", error);
        res.status(500).json({
            message: 'Error al inscribir el patrocinador al torneo',
            error: error.message,
        });
    }
};

const updatePatrocinadorTorneo = async (req, res) => {
    const inscripcionId = req.params.id; 
    const updateData = req.body;

    if (!inscripcionId || isNaN(inscripcionId)) {
        return res.status(400).json({ message: 'ID de inscripción no válido o faltante' });
    }

    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: 'Datos de actualización no proporcionados' });
    }

    try {
        const affectedRows = await patrocinadorTorneoModel.updatePatrocinadorTorneo(inscripcionId, updateData);

        if (affectedRows === 0) {
            return res.status(404).json({ message: `No se encontró el registro de inscripción con ID ${inscripcionId} o no se proporcionaron cambios.` });
        }

        res.status(200).json({ 
            message: `Registro de inscripción con ID ${inscripcionId} actualizado exitosamente`,
            inscripcionId: inscripcionId 
        });

    } catch (error) {
        console.error("❌ ERROR al actualizar inscripción ❌:", error);
        res.status(500).json({
            message: 'Error al intentar actualizar la inscripción',
            error: error.message,
        });
    }
};

export {
    inscribirPatrocinadorATorneo,
    updatePatrocinadorTorneo
};