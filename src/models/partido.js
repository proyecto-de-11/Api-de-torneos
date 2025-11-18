import pool from '../config/database.js';


/**
 * Crea un nuevo registro de partido en la base de datos.
 * @param {object} serviceData - Datos del partido a crear.
 * @throws {Error} - Si ocurre un error durante la inserción.
 */
const createPartido = async (serviceData) => {
    // Desestructuración
    const { 
        creado_por, 
        equipo_local_id, 
        equipo_visitante_id, 
        reserva_id, 
        torneo_id, 
        tipo_partido, 
        fecha_partido, 
        hora_inicio, 
        duracion_minutos, 
        resultado_local, 
        resultado_visitante, 
        estado, 
        observaciones 
    } = serviceData;

    try {
        const [result] = await pool.query( 
            `INSERT INTO partidos (
                creado_por, equipo_local_id, equipo_visitante_id, reserva_id, torneo_id, 
                tipo_partido, fecha_partido, hora_inicio, duracion_minutos, 
                resultado_local, resultado_visitante, estado, observaciones 
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                // Array de valores para los marcadores de posición
                creado_por, equipo_local_id, equipo_visitante_id, reserva_id, torneo_id, 
                tipo_partido, fecha_partido, hora_inicio, duracion_minutos, 
                resultado_local, resultado_visitante, estado, observaciones
            ]
        );
        
        // Retorna el ID generado para el nuevo partido
        return result.insertId;
        
    } catch (error) {
        // En un modelo, generalmente solo relanzas el error para que el controlador lo maneje
        throw error;
    }
};
/**
 * Actualiza un registro de partido por su ID.
 * @param {number} id - El ID del partido a actualizar.
 * @param {object} serviceData - Los datos a actualizar.
 * @returns {Promise<number>} - El número de filas afectadas.
 * @throws {Error} - Si ocurre un error de base de datos.
 */
const updatePartido = async (id, serviceData) => {
    const columns = [];
    const values = [];

    // Campos que NO deberían ser modificables a través de este endpoint (p. ej., IDs claves)
    // Esto es opcional, pero añade una capa de seguridad.
    const excludedFields = ['id', 'fecha_creacion', 'fecha_actualizacion'];
    
    // Iterar sobre los datos recibidos (serviceData)
    for (const key in serviceData) {
        // 1. Asegurarse de que el valor no sea undefined (para evitar NULLs inesperados)
        // 2. Asegurarse de que el campo no esté en la lista de exclusión
        if (serviceData[key] !== undefined && !excludedFields.includes(key)) { 
            columns.push(`${key} = ?`);
            values.push(serviceData[key]);
        }
    }

    // Si no hay campos para actualizar, retornar 0
    if (columns.length === 0) {
        return 0; 
    }

    // Añadir el ID del partido al final para la cláusula WHERE
    values.push(id);

    // Construir la consulta SQL
    const sql = `UPDATE partidos SET ${columns.join(', ')} WHERE id = ?`;

    try {
        // Usar pool.query si es un pool con promesas, o pool.promise().query si es necesario
        const [result] = await pool.query(sql, values); 
        return result.affectedRows; 

    } catch (error) {
        throw error;
    }
};
/**
 * Obtiene todos los registros de partidos de la base de datos.
 * @returns {Promise<Array>} - Un array con todos los objetos de partido.
 * @throws {Error} - Si ocurre un error de base de datos.
 */
const getAllPartidos = async () => {
    try {
        // Consulta SQL que selecciona todos los campos (*) directamente de la tabla partidos
        // y ordena por fecha de creación de forma descendente.
        const sql = `
            SELECT 
                id, creado_por, equipo_local_id, equipo_visitante_id, reserva_id, 
                torneo_id, tipo_partido, fecha_partido, hora_inicio, 
                duracion_minutos, resultado_local, resultado_visitante, 
                estado, observaciones, fecha_creacion, fecha_actualizacion
            FROM partidos 
            ORDER BY fecha_creacion DESC
        `;

        // Ejecutar la consulta sin usar .promise().query
        const [rows] = await pool.query(sql); 
        
        return rows; 

    } catch (error) {
        // Relanzar el error para que el controlador lo maneje
        throw error;
    }
};

export {
    createPartido,
    updatePartido,
    getAllPartidos
};