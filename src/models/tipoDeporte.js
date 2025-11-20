// models/tipoDeporte.js (CORREGIDO)
import pool from '../config/database.js';

const createTipoDeport = async (serviceData) => {
    const { nombre, descripcion, icono, esta_activo } = serviceData;

    try {
      
        const [result] = await pool.query( 
            'INSERT INTO tipos_deporte (nombre, descripcion, icono, esta_activo) VALUES (?, ?, ?, ?)',
            [nombre, descripcion, icono, esta_activo]
        );
        return result.insertId;
        
    } catch (error) {
        throw error;
    }
};

/**
 * Elimina un tipo de deporte por su ID.
 * @param {number} id - El ID del deporte a eliminar.
 * @returns {number} El número de filas afectadas (debería ser 1 si se eliminó).
 */
const deleteTipoDeport = async (id) => {
    try {
     
        const [result] = await pool.query(
            'DELETE FROM tipos_deporte WHERE id = ?',
            [id]
        );
    
        return result.affectedRows; 

    } catch (error) {
        throw error;
    }
};

/**
 * Busca un tipo de deporte por su nombre (o coincidencia parcial).
 * Utiliza LIKE para búsquedas flexibles e insensibles a mayúsculas/minúsculas.
 * @param {string} nombre - El nombre o parte del nombre a buscar.
 * @returns {Array} Un array con los deportes encontrados.
 */
const getTipoDeportByName = async (nombre) => {
    try {
      
        const [rows] = await pool.query(
            'SELECT id, nombre, descripcion, icono, esta_activo FROM tipos_deporte WHERE nombre LIKE CONCAT("%", ?, "%")',
            [nombre]
        );
        // Nota: Se eliminó el COLLATE por defecto para mayor compatibilidad, 
        // a menos que sepas que tu DB lo soporta.
        return rows; 
    } catch (error) {
        throw error;
    }
};

export {
    createTipoDeport,
    deleteTipoDeport,
    getTipoDeportByName
};