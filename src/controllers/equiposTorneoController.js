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

const updatequipoTorneo = async (req, res) => {
    const inscripcionId = req.params.id; 
    const updateData = req.body;

    if (!inscripcionId || isNaN(inscripcionId)) {
        return res.status(400).json({ message: 'ID de inscripción no válido o faltante' });
    }

    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: 'Datos de actualización no proporcionados' });
    }

    try {
        const affectedRows = await equipoTorneoModel.updateEquipoTorneo(inscripcionId, updateData);

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

const deleteEquipoTorneo = async (req, res) => {
    const inscripcionId = req.params.id; 
    

    if (!inscripcionId || isNaN(inscripcionId)) {
        return res.status(400).json({ message: 'ID de inscripcion no válido o faltante' });
    }

    try {
       
        const affectedRows = await equipoTorneoModel.deleteEsquiporTorneo(inscripcionId);

       
        if (affectedRows === 0) {
           
            return res.status(404).json({ message: `No se encontró  la inscripcion con ID ${inscripcionId}` });
        }

       
        res.status(200).json({ 
            message: `inscripción con ID ${inscripcionId} eliminado exitosamente`,
            inscripcionId: inscripcionId ,
           
        });

    } catch (error) {
        console.error("❌❌ ERROR FATAL CAPTURADO ❌❌:", error);
        

        res.status(500).json({
            message: 'Error al intentar eliminar la inscripcion',
            error: error.message,
            detail: "Verifique el error en la terminal de Node.js."
        });
    }
};

const getInscripcionTorneoById = async (req, res) => {
    const inscripcionId = req.params.id;

   
    if (!inscripcionId || isNaN(inscripcionId)) {
        return res.status(400).json({ message: 'ID de inscripcion no válido o faltante' });
    }

    try {
        const inscripcion = await equipoTorneoModel.getInscripcionTorneoById(inscripcionId);

        if (!inscripcion) {
            return res.status(404).json({ message: `inscripcion al torneo con ID ${inscripcionId} no encontrado.` });
        }

        res.status(200).json(inscripcion);

    } catch (error) {
        console.error("❌ ERROR al obtener la inscripcion del torneo por ID ❌:", error);
        res.status(500).json({
            message: 'Error interno del servidor al obtener el torneo',
            error: error.message,
        });
    }
};

export {
    inscribirEquipo,
    updatequipoTorneo,
    deleteEquipoTorneo,
    getInscripcionTorneoById
};