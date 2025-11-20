import pool from '../config/database.js';


/**
 * Inscribe un equipo a un torneo, creando un registro en equipos_torneo.
 * @param {object} serviceData - Datos de la inscripción.
 * @returns {number} El ID del nuevo registro de inscripción.
 */
const CrearEstadisticaEquipo = async (serviceData) => {
    const { 
        equipo_id, 
        partidos_jugados_total, 
        partidos_ganados_total ,
        partidos_perdidos_total ,
        partidos_empatados_total,
        goles_favor_total,
        goles_contra_total,
        partidos_jugados_torneos,
        partidos_ganados_torneos,
        partidos_perdidos_torneos,
        partidos_empatados_torneos,
        goles_favor_torneos,
        goles_contra_torneos,
        torneos_ganados
    } = serviceData;

    try {
        const [result] = await pool.query(
            'INSERT INTO estadisticas_equipo (equipo_id, partidos_jugados_total, partidos_ganados_total, partidos_perdidos_total, partidos_empatados_total, goles_favor_total, goles_contra_total, partidos_jugados_torneos, partidos_ganados_torneos, partidos_perdidos_torneos, partidos_empatados_torneos, goles_favor_torneos, goles_contra_torneos, torneos_ganados) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [ equipo_id, partidos_jugados_total, partidos_ganados_total, partidos_perdidos_total, partidos_empatados_total, goles_favor_total, goles_contra_total, partidos_jugados_torneos, partidos_ganados_torneos, partidos_perdidos_torneos, partidos_empatados_torneos, goles_favor_torneos,goles_contra_torneos, torneos_ganados]
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
const updateEstadisticaEquipo = async (id, serviceData) => {
    const columns = [];
    const values = [];

    // Lista de campos que NO deben ser actualizados por el usuario
    const excludedFields = [ 'equipo_id'];
    
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
    const sql = `UPDATE estadisticas_equipo SET ${columns.join(', ')} WHERE id = ?`;

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
const deleteEstadisticaEquipo = async (id) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM estadisticas_equipo WHERE id = ?',
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
const getAllEstadisticasEquipos = async () => {
    try {
        // Seleccionamos todos los campos para listar la información completa
        const [rows] = await pool.query(
            'SELECT id, equipo_id, partidos_jugados_total, partidos_ganados_total, partidos_perdidos_total, partidos_empatados_total, goles_favor_total, goles_contra_total, partidos_jugados_torneos, partidos_ganados_torneos, partidos_perdidos_torneos, partidos_empatados_torneos, goles_favor_torneos, goles_contra_torneos, torneos_ganados FROM estadisticas_equipo ORDER BY id DESC'
        );
        // Devolvemos el array de resultados
        return rows; 
    } catch (error) {
        throw error;
    }
};


export{
  CrearEstadisticaEquipo,
  updateEstadisticaEquipo,
  deleteEstadisticaEquipo,
  getAllEstadisticasEquipos
};
