import pool from '../config/database.js';

/**
 * Crea una nueva calificación de jugador, validando la existencia del partido
 * y el rango de la puntuación.
 * @param {object} serviceData - Datos de la calificación a crear.
 * @returns {Promise<number>} - El ID de la calificación recién creada.
 * @throws {Error} - Si el partido_id no existe, el evaluador/jugador no existe,
 * o si la calificación ya existe (UNIQUE KEY).
 */
const createCalificacionJugador = async (serviceData) => {
    const { 
        partido_id, 
        evaluador_id, 
        jugador_evaluado_id, 
        puntuacion, 
        posicion_destacada,
        habilidades, 
        comentario,
        es_anonimo
    } = serviceData;

    try {
        // 1. VALIDACIÓN DE EXISTENCIA DEL PARTIDO 🔑
        const [partidoRows] = await pool.query(
            'SELECT id FROM partidos WHERE id = ?',
            [partido_id]
        );

        if (partidoRows.length === 0) {
            const error = new Error(`El Partido con ID ${partido_id} no existe.`);
            error.code = 'PARTIDO_NO_ENCONTRADO';
            throw error;
        }
        
        // 2. PREPARACIÓN DE DATOS
        // Convierte el array de habilidades a una cadena JSON para MySQL
        const habilidadesJson = habilidades ? JSON.stringify(habilidades) : null;
        
        // El campo es_anonimo se convierte a 0 o 1 si se recibe como booleano
        const esAnonimoDB = es_anonimo === true ? 1 : 0; 
        
        // 3. CREACIÓN DE LA CALIFICACIÓN
        const [result] = await pool.query( 
            `INSERT INTO calificaciones_jugador (
                partido_id, evaluador_id, jugador_evaluado_id, puntuacion, 
                posicion_destacada, habilidades, comentario, es_anonimo
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                partido_id, 
                evaluador_id, 
                jugador_evaluado_id, 
                puntuacion, 
                posicion_destacada,
                habilidadesJson, 
                comentario,
                esAnonimoDB
            ]
        );
        
        return result.insertId;
        
    } catch (error) {
        // Manejar el error de UNIQUE KEY si la calificación ya existe
        if (error.code === 'ER_DUP_ENTRY') {
            error.message = 'Ya existe una calificación para este jugador, por este evaluador, en este partido.';
            error.code = 'CALIFICACION_DUPLICADA';
        }
        
        // Manejar el error de puntuación fuera de rango
        if (error.code === 'ER_CHECK_CONSTRAINT_VIOLATED') {
             error.message = 'La puntuación debe estar entre 1.0 y 5.0.';
        }
        
        throw error;
    }
};

/**
 * Obtiene todos los registros de calificaciones de jugadores de la base de datos.
 * @returns {Promise<Array>} - Un array con todos los objetos de calificación.
 * @throws {Error} - Si ocurre un error de base de datos.
 */
const getAllCalificacionesJugador = async () => {
    try {
        // Consulta SQL que selecciona todos los campos de la tabla calificaciones_jugador
        const sql = `
            SELECT 
                id, partido_id, evaluador_id, jugador_evaluado_id, puntuacion, 
                posicion_destacada, habilidades, comentario, es_anonimo, 
                fecha_creacion
            FROM calificaciones_jugador 
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

/**
 * Obtiene un registro de calificación de jugador por su ID.
 * @param {number} id - El ID de la calificación a buscar.
 * @returns {Promise<object|null>} El objeto calificación si se encuentra, o null.
 * @throws {Error} - Si ocurre un error de base de datos.
 */
const getCalificacionJugadorById = async (id) => {
    try {
        // Consulta SQL para seleccionar todos los campos de la calificación por su ID
        const sql = 'SELECT * FROM calificaciones_jugador WHERE id = ?';
        
        const [rows] = await pool.query(sql, [id]);
        
        // Si se encuentra un resultado, devolver el primer elemento; si no, devolver null.
        return rows.length > 0 ? rows[0] : null; 
        
    } catch (error) {
        // Relanzar el error para que el controlador lo maneje
        throw error;
    }
};

/**
 * Actualiza un registro de calificación de jugador por su ID.
 * @param {number} id - El ID de la calificación a actualizar.
 * @param {object} serviceData - Los datos a actualizar.
 * @returns {Promise<number>} - El número de filas afectadas.
 * @throws {Error} - Si ocurre un error de base de datos.
 */
const updateCalificacionJugador = async (id, serviceData) => {
    const columns = [];
    const values = [];

    // Campos que NO deberían ser modificables (claves primarias, foráneas y fechas de creación)
    const excludedFields = [
        'id', 'partido_id', 'evaluador_id', 'jugador_evaluado_id', 'fecha_creacion'
    ];
    
    // Iterar sobre los datos recibidos (serviceData)
    for (const key in serviceData) {
        
        // 1. Asegurarse de que el valor no sea undefined (para evitar NULLs no intencionados)
        // 2. Asegurarse de que el campo no esté excluido
        if (serviceData[key] !== undefined && !excludedFields.includes(key)) {
            let value = serviceData[key];

            // Manejo especial para el campo 'habilidades' (JSON) y 'es_anonimo' (BOOLEAN)
            if (key === 'habilidades' && Array.isArray(value)) {
                 // Convertir el array a cadena JSON para la base de datos
                 value = JSON.stringify(value);
            } else if (key === 'es_anonimo' && typeof value === 'boolean') {
                 // Convertir el booleano a 0 o 1
                 value = value ? 1 : 0;
            }

            columns.push(`${key} = ?`);
            values.push(value);
        }
    }

    // Si no hay campos válidos para actualizar, retornar 0
    if (columns.length === 0) {
        return 0; 
    }

    // Añadir el ID de la calificación al final para la cláusula WHERE
    values.push(id);

    // Construir la consulta SQL
    const sql = `UPDATE calificaciones_jugador SET ${columns.join(', ')} WHERE id = ?`;

    try {
        const [result] = await pool.query(sql, values); 
        return result.affectedRows; 

    } catch (error) {
        // Manejar el error si la puntuación está fuera de rango
        if (error.code === 'ER_CHECK_CONSTRAINT_VIOLATED') {
             error.message = 'La puntuación debe estar entre 1.0 y 5.0.';
        }
        throw error;
    }
};

export {
    createCalificacionJugador,
    getAllCalificacionesJugador,
    getCalificacionJugadorById,
    updateCalificacionJugador
};