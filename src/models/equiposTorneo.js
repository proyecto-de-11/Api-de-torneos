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

/**
 * Actualiza un registro de equipos_torneo por su ID de inscripción.
 * @param {number} id - El ID del registro de inscripción (columna 'id').
 * @param {object} serviceData - Los datos a actualizar.
 * @returns {number} El número de filas afectadas.
 */
const updateEquipoTorneo = async (id, serviceData) => {
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
    const sql = `UPDATE equipos_torneo SET ${columns.join(', ')} WHERE id = ?`;

    try {
        const [result] = await pool.promise().query(sql, values);
        return result.affectedRows; 

    } catch (error) {
        throw error;
    }
};


export {
    inscribirEquipoATorneo,
    updateEquipoTorneo
};