const pool = require('../config/db.js');


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

const findDeporteByName = async (nombre) => {
    try {
        const [rows] = await pool.promise().query(
            'SELECT * FROM tipos_deporte WHERE nombre = ?',
            [nombre]
        );
        return rows[0];
    } catch (error) {
        throw error;
    } 
};