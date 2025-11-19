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

/**
 * Actualiza un registro de initaciones_torneo por su ID de inscripción.
 * @param {number} id - El ID del registro de inscripción (columna 'id').
 * @param {object} serviceData - Los datos a actualizar.
 * @returns {number} El número de filas afectadas.
 */
const updateInvitacionTorneo = async (id, serviceData) => {
    const columns = [];
    const values = [];

    // Lista de campos que NO deben ser actualizados por el usuario
    const excludedFields = [ 'torneo_id', 'equipo_id'];
    
    // Iterar sobre los datos recibidos (serviceData)
    for (const key in serviceData) {
        // Usar los nombres de columna exactos de tu tabla
        if (serviceData[key] !== undefined && !excludedFields.includes(key)) { 
            columns.push(`${key} = ?`);
            values.push(serviceData[key]);
        }
    }

    if (columns.length === 0) {
        return 0; 
    }

    values.push(id);

    // Construir la consulta SQL
    const sql = `UPDATE invitaciones_torneo SET ${columns.join(', ')} WHERE id = ?`;

    try {
        const [result] = await pool.query(sql, values);
        return result.affectedRows; 

    } catch (error) {
        throw error;
    }
};

/**
 * Obtiene todas las inscripciones (invitaciones_torneo) para un torneo específico.
 * @param {number} torneoId - El ID del torneo a consultar.
 * @returns {Array} Un array de objetos de inscripción.
 */
const getInvitacionesByTorneoId = async (torneoId) => {
    try {
        // La consulta SQL selecciona todos los campos de la tabla 'invitaciones_torneo'
        const [rows] = await pool.query(
            'SELECT id, equipo_id, torneo_id, fecha_creacion FROM invitaciones_torneo WHERE torneo_id = ?',
            [torneoId]
        );
        return rows;
    } catch (error) {
        // Re-lanza el error para que el controlador lo maneje
        throw error;
    }
};

export {
  CreateInvitacionTorneo,
  updateInvitacionTorneo,
  getInvitacionesByTorneoId
};
