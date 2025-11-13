import pool from '../config/database.js';

const createTorneo = async (serviceData) => {
    const {creado_por, nombre, descripcion, tipo_deporte_id, categoria, nivel, formato, max_equipos, min_equipos, premio_descripcion, reglas, fecha_inicio, fecha_fin, fecha_inscripcion_inicio, fecha_inscripcion_fin, costo_inscripcion, ubicacion, logo, estado} = serviceData;

    try {
        const [result] = await pool.promise().query( 
            'INSERT INTO torneos (creado_por, nombre, descripcion, tipo_deporte_id, categoria, nivel, formato, max_equipos, min_equipos, premio_descripcion, reglas, fecha_inicio, fecha_fin, fecha_inscripcion_inicio, fecha_inscripcion_fin, costo_inscripcion, ubicacion, logo, estado ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [creado_por, nombre, descripcion, tipo_deporte_id, categoria, nivel, formato, max_equipos, min_equipos, premio_descripcion, reglas, fecha_inicio, fecha_fin, fecha_inscripcion_inicio, fecha_inscripcion_fin, costo_inscripcion, ubicacion, logo, estado]
        );
        return result.insertId;
        
    } catch (error) {
        
        throw error;
    }
};

/**
 * @param {number} id - El ID del torneo a actualizar.
 * @param {object} serviceData - Los datos del torneo a actualizar.
 * @returns {number} El número de filas afectadas (debería ser 1 si se actualizó).
 */
const updateTorneo = async (id, serviceData) => {
    const columns = [];
    const values = [];

    for (const key in serviceData) {
        if (serviceData[key] !== undefined) {
            if (key !== 'id' && key !== 'fecha_creacion' && key !== 'fecha_actualizacion') {
                columns.push(`${key} = ?`);
                values.push(serviceData[key]);
            }
        }
    }

    if (columns.length === 0) {
        return 0;
    }

    values.push(id);

    const sql = `UPDATE torneos SET ${columns.join(', ')} WHERE id = ?`;

    try {
        const [result] = await pool.promise().query(sql, values);
        return result.affectedRows; 

    } catch (error) {
        throw error;
    }
};

/**
 * Elimina un tipo de deporte por su ID.
 * @param {number} id - El ID del deporte a eliminar.
 * @returns {number} El número de filas afectadas (debería ser 1 si se eliminó).
 */
const deleteTorneo = async (id) => {
    try {
        const [result] = await pool.promise().query(
            'DELETE FROM torneos WHERE id = ?',
            [id]
        );
    
        return result.affectedRows; 

    } catch (error) {
        
        throw error;
    }
};

export {
    createTorneo,
    updateTorneo,
    deleteTorneo
};