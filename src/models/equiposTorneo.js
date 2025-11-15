import pool from '../config/database.js';

/**
 * Inscribe un equipo a un torneo, creando un registro en equipos_torneo.
 * @param {object} serviceData - Datos de la inscripción.
 * @returns {number} El ID del nuevo registro de inscripción.
 */
const inscribirEquipoATorneo = async (serviceData) => {
    const { 
        torneo_id, 
        equipo_id, 
        esta_confirmado, 
        grupo ,
        posicion_grupo ,
        posicion_general
    } = serviceData;

    try {
        const [result] = await pool.promise().query(
            'INSERT INTO equipos_torneo (torneo_id, equipo_id, esta_confirmado, grupo, posicion_grupo, posicion_general) VALUES (?, ?, ?, ?, ?, ?)',
            [torneo_id, equipo_id, esta_confirmado, grupo, posicion_grupo, posicion_general]
        );
        return result.insertId;
        
    } catch (error) {
        throw error;
    }
};

export {
    inscribirEquipoATorneo
};