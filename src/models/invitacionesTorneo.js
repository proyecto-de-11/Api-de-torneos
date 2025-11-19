import pool from '../config/database.js';

/**
 * Inscribe un equipo a un torneo, creando un registro en equipos_torneo.
 * @param {object} serviceData - Datos de la inscripción.
 * @returns {number} El ID del nuevo registro de inscripción.
 */
const CreateInvitacionTorneo = async (serviceData) => {
    const { 
        torneo_id, 
        equipo_id, 
        usuario_remitente_id, 
        usuario_respondio_id ,
        mensaje ,
        estado
    } = serviceData;

    try {
        const [result] = await pool.query(
            'INSERT INTO invitaciones_torneo (torneo_id, equipo_id, usuario_remitente_id, usuario_respondio_id, mensaje, estado) VALUES (?, ?, ?, ?, ?, ?)',
            [torneo_id, equipo_id, usuario_remitente_id, usuario_respondio_id, mensaje, estado]
        );
        return result.insertId;
        
    } catch (error) {
        throw error;
    }
};

export {
  CreateInvitacionTorneo
};
