import pool from '../config/database.js';

const createTipoDeport = async (serviceData) => {
    const { nombre, descripcion, icono, esta_activo } = serviceData;

    try {
        const [result] = await pool.promise().query( 
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
        const [result] = await pool.promise().query(
            'DELETE FROM tipos_deporte WHERE id = ?',
            [id]
        );
    
        return result.affectedRows; 

    } catch (error) {
        
        throw error;
    }
};

export {
    createTipoDeport,
    deleteTipoDeport
};