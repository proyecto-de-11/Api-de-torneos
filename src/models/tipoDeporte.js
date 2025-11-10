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

export {
    createTipoDeport
};