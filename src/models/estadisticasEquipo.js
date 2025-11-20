import pool from '../config/database.js';


/**
 * Inscribe un equipo a un torneo, creando un registro en equipos_torneo.
 * @param {object} serviceData - Datos de la inscripción.
 * @returns {number} El ID del nuevo registro de inscripción.
 */
const CrearEstadisricaEquipo = async (serviceData) => {
    const { 
        equipo_id, 
        partidos_jugados_total, 
        partidos_ganados_total ,
        partidos_perdidos_total ,
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
    } = serviceData;

    try {
        const [result] = await pool.query(
            'INSERT INTO estadisticas_equipo (equipo_id, partidos_jugados_total, partidos_ganados_total, partidos_perdidos_total, partidos_empatados_total, goles_favor_total, goles_contra_total, partidos_jugados_torneos, partidos_ganados_torneos, partidos_perdidos_torneos, partidos_empatados_torneos, goles_favor_torneos, goles_contra_torneos, torneos_ganados) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [ equipo_id, partidos_jugados_total, partidos_ganados_total, partidos_perdidos_total, partidos_empatados_total, goles_favor_total, goles_contra_total, partidos_jugados_torneos, partidos_ganados_torneos, partidos_perdidos_torneos, partidos_empatados_torneos, goles_favor_torneos,goles_contra_torneos, torneos_ganados]
        );
        return result.insertId;
        
    } catch (error) {
        throw error;
    }
};

export{
  CrearEstadisricaEquipo
};
