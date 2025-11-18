import pool from '../config/database.js';


/**
 * Crea un nuevo registro de partido en la base de datos.
 * @param {object} serviceData - Datos del partido a crear.
 * @returns {Promise<number>} - El ID del partido recién creado.
 * @throws {Error} - Si ocurre un error durante la inserción.
 */
const createPartido = async (serviceData) => {
    // Desestructuración
    const { 
        creado_por, 
        equipo_local_id, 
        equipo_visitante_id, 
        reserva_id, 
        torneo_id, 
        tipo_partido, 
        fecha_partido, 
        hora_inicio, 
        duracion_minutos, 
        resultado_local, 
        resultado_visitante, 
        estado, 
        observaciones 
    } = serviceData;

    try {
        const [result] = await pool.promise().query( 
            `INSERT INTO partidos (
                creado_por, equipo_local_id, equipo_visitante_id, reserva_id, torneo_id, 
                tipo_partido, fecha_partido, hora_inicio, duracion_minutos, 
                resultado_local, resultado_visitante, estado, observaciones 
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                // Array de valores para los marcadores de posición
                creado_por, equipo_local_id, equipo_visitante_id, reserva_id, torneo_id, 
                tipo_partido, fecha_partido, hora_inicio, duracion_minutos, 
                resultado_local, resultado_visitante, estado, observaciones
            ]
        );
        
        // Retorna el ID generado para el nuevo partido
        return result.insertId;
        
    } catch (error) {
        // En un modelo, generalmente solo relanzas el error para que el controlador lo maneje
        throw error;
    }
};

module.exports = {
    createPartido
};