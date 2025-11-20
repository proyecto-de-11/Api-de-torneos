import pool from '../config/database.js';

/**
 * Inscribe un patrocinador a un torneo, 
 * @param {object} serviceData - Datos de la inscripción.
 * @returns {number} El ID del nuevo registro de inscripción.
 */
const inscribirPatrocinadorATorneo = async (serviceData) => {
    const { 
        torneo_id, 
        empresa_id, 
        nivel_patrocinio, 
        monto_aportado ,
        logo ,
        enlace_web,
        descripcion
    } = serviceData;

    try {
        const [result] = await pool.query(
            'INSERT INTO patrocinadores (torneo_id, empresa_id, nivel_patrocinio, monto_aportado, logo, enlace_web, descripcion) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [torneo_id, empresa_id, nivel_patrocinio, monto_aportado, logo, enlace_web, descripcion]
        );
        return result.insertId;
        
    } catch (error) {
        throw error;
    }
};

/**
 * Actualiza un registro patrocinadores por su ID de inscripción.
 * @param {number} id - El ID del registro de inscripción (columna 'id').
 * @param {object} serviceData - Los datos a actualizar.
 * @returns {number} El número de filas afectadas.
 */
const updatePatrocinadorTorneo = async (id, serviceData) => {
    const columns = [];
    const values = [];

    // Lista de campos que NO deben ser actualizados por el usuario
    const excludedFields = [ 'torneo_id', 'empresa_id'];
    
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
    const sql = `UPDATE patrocinadores SET ${columns.join(', ')} WHERE id = ?`;

    try {
        const [result] = await pool.query(sql, values);
        return result.affectedRows; 

    } catch (error) {
        throw error;
    }
};


export {
   inscribirPatrocinadorATorneo,
   updatePatrocinadorTorneo
};
