import * as estadisticasEquipoModel from '../models/estadisticasEquipo.js';


const CrearEstadisricaEquipo = async (req, res) => {
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

export{
    CrearEstadisricaEquipo
};