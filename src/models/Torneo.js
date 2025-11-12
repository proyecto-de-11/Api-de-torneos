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

export {
    createTorneo
};