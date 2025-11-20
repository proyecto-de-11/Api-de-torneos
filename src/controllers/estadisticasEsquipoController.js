import * as estadisticasEquipoModel from '../models/estadisticasEquipo.js';


const CrearEstadisticaEquipo = async (req, res) => {
    const {
        equipo_id,
        partidos_jugados_total,
        partidos_ganados_total,
        partidos_perdidos_total,
        partidos_empatados_total,
        goles_favor_total,
        goles_contra_total,
        partidos_jugados_torneos,
        partidos_ganados_torneos,
        partidos_perdidos_torneos,
        partidos_empatados_torneos,
        goles_favor_torneos,
        goles_contra_torneos,
        torneos_ganados
    } = req.body;
    if (!equipo_id) {
        return res.status(400).json({ message: 'El ID del equipo es obligatorio.' });
    }

    try {

        const inscripcionData = {
            equipo_id,
            partidos_jugados_total,
            partidos_ganados_total,
            partidos_perdidos_total,
            partidos_empatados_total,
            goles_favor_total,
            goles_contra_total,
            partidos_jugados_torneos,
            partidos_ganados_torneos,
            partidos_perdidos_torneos,
            partidos_empatados_torneos,
            goles_favor_torneos,
            goles_contra_torneos,
            torneos_ganados

        };
        const newEstadisticaEquipoId = await estadisticasEquipoModel.CrearEstadisricaEquipo(inscripcionData);

        res.status(201).json({
            message: 'Estadistica de equipo creada exitosamente',
            estadisticaEquipoId: newEstadisticaEquipoId
        });

    } catch (error) {
        console.error("❌ ERROR al crear estadistica de equipo ❌:", error);
        res.status(500).json({
            message: 'Error al crear estadistica de equipo al torneo',
            error: error.message,
        });
    }
};

const updatEstadisticaEquipo = async (req, res) => {
    const inscripcionId = req.params.id; 
    const updateData = req.body;

    if (!inscripcionId || isNaN(inscripcionId)) {
        return res.status(400).json({ message: 'ID de estadistica de equipo no válido o faltante' });
    }

    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: 'Datos de actualización no proporcionados' });
    }

    try {
        const affectedRows = await estadisticasEquipoModel.updateEstadisticaEquipo(inscripcionId, updateData);

        if (affectedRows === 0) {
            return res.status(404).json({ message: `No se encontró el registro de estadistica con ID ${inscripcionId} o no se proporcionaron cambios.` });
        }

        res.status(200).json({ 
            message: `Registro de estadistica con ID ${inscripcionId} actualizado exitosamente`,
            inscripcionId: inscripcionId 
        });

    } catch (error) {
        console.error("❌ ERROR al actualizar estadistica ❌:", error);
        res.status(500).json({
            message: 'Error al intentar actualizar la estadistica',
            error: error.message,
        });
    }
};


export{
    CrearEstadisticaEquipo,
    updatEstadisticaEquipo
};