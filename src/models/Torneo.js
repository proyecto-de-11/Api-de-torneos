import pool from '../config/database.js';

const createTorneo = async (serviceData) => {
    const {creado_por, nombre, descripcion, tipo_deporte_id, categoria, nivel, formato, max_equipos, min_equipos, premio_descripcion, reglas, fecha_inicio, fecha_fin, fecha_inscripcion_inicio, fecha_inscripcion_fin, costo_inscripcion, ubicacion, logo, estado} = serviceData;

    try {
        const [result] = await pool.query( 
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
        const [result] = await pool.query(sql, values);
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
        const [result] = await pool.query(
            'DELETE FROM torneos WHERE id = ?',
            [id]
        );
    
        return result.affectedRows; 

    } catch (error) {
        
        throw error;
    }
};

/**
 * Obtiene todos los torneos de la base de datos.
 * @returns {Array} Un array con todos los objetos de torneo.
 */
const getAllTorneos = async () => {
    try {
        // Seleccionamos todos los campos para listar la información completa
        const [rows] = await pool.query(
            'SELECT id, nombre, tipo_deporte_id, categoria, nivel, estado, fecha_inicio, costo_inscripcion, fecha_creacion, fecha_actualizacion FROM torneos ORDER BY fecha_creacion DESC'
        );
        // Devolvemos el array de resultados
        return rows; 
    } catch (error) {
        throw error;
    }
};

/**
 * Obtiene un torneo por su ID.
 * @param {number} id - El ID del torneo a buscar.
 * @returns {object|null} El objeto torneo si se encuentra, o null.
 */
const getTorneoById = async (id) => {
    try {
        const [rows] = await pool.query(
            // Seleccionamos todos los campos del torneo
            'SELECT * FROM torneos WHERE id = ?',
            [id]
        );
        
        // Si rows tiene un elemento, lo devolvemos; si está vacío, devolvemos null
        return rows.length > 0 ? rows[0] : null; 
    } catch (error) {
        throw error;
    }
};
const getTorneoCreadoById = async (id) => {
    try {
        const [rows] = await pool.query(
            // Seleccionamos todos los campos del torneo
            'SELECT * FROM torneos WHERE creado_por = ?',
            [id]
        );
        
        // Si rows tiene un elemento, lo devolvemos; si está vacío, devolvemos null
        return rows.length > 0 ? rows[0] : null; 
    } catch (error) {
        throw error;
    }
};

export {
    createTorneo,
    updateTorneo,
    deleteTorneo,
    getAllTorneos,
    getTorneoById,
    getTorneoCreadoById
};
