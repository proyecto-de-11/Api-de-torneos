import pool from '../config/database.js';

/**
 * Crea un nuevo registro de invitación a partido en la base de datos,
 * validando previamente la existencia del partido.
 * * @param {object} serviceData - Datos de la invitación a crear.
 * @returns {Promise<number>} - El ID de la invitación recién creada.
 * @throws {Error} - Si el partido_id no existe o si ocurre otro error de DB.
 */
const createInvitacionPartido = async (serviceData) => {
    const { 
        partido_id, 
        equipo_invitado_id, 
        usuario_invito_id, 
        mensaje, 
    } = serviceData;

    try {
        // 1. VALIDACIÓN DE EXISTENCIA DEL PARTIDO 
        const [partidoRows] = await pool.query(
            'SELECT id FROM partidos WHERE id = ?',
            [partido_id]
        );

        if (partidoRows.length === 0) {
            // Si el partido no existe, lanzamos un error explícito
            const error = new Error(`El Partido con ID ${partido_id} no existe.`);
            error.code = 'PARTIDO_NO_ENCONTRADO'; // Código personalizado para manejarlo en el controlador
            throw error;
        }
        
        // 2. CREACIÓN DE LA INVITACIÓN (Si la validación fue exitosa)
        const [result] = await pool.query( 
            `INSERT INTO invitaciones_partido (
                partido_id, equipo_invitado_id, usuario_invito_id, mensaje
            ) VALUES (?, ?, ?, ?)`,
            [
                partido_id, 
                equipo_invitado_id, 
                usuario_invito_id, 
                mensaje
            ]
        );
        
        return result.insertId;
        
    } catch (error) {
        // En el modelo, simplemente relanzamos el error (puede ser el error de validación o uno de la DB)
        throw error;
    }
};

/**
 * Obtiene todos los registros de invitaciones a partidos de la base de datos.
 * @returns {Promise<Array>} - Un array con todos los objetos de invitación.
 * @throws {Error} - Si ocurre un error de base de datos.
 */
const getAllInvitacionesPartido = async () => {
    try {
        // Consulta SQL que selecciona todos los campos de la tabla invitaciones_partido
        const sql = `
            SELECT 
                id, partido_id, equipo_invitado_id, usuario_invito_id, mensaje, 
                estado, fecha_respuesta, fecha_creacion
            FROM invitaciones_partido 
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
 * Obtiene un registro de invitación a partido por su ID.
 * @param {number} id - El ID de la invitación a buscar.
 * @returns {Promise<object|null>} El objeto invitación si se encuentra, o null.
 * @throws {Error} - Si ocurre un error de base de datos.
 */
const getInvitacionPartidoById = async (id) => {
    try {
        // Consulta SQL para seleccionar todos los campos de la invitación por su ID
        const sql = 'SELECT * FROM invitaciones_partido WHERE id = ?';
        
        const [rows] = await pool.query(sql, [id]);
        
        // Si se encuentra un resultado, devolver el primer elemento; si no, devolver null.
        return rows.length > 0 ? rows[0] : null; 
        
    } catch (error) {
        // Relanzar el error para que el controlador lo maneje
        throw error;
    }
};

export {
    createInvitacionPartido,
    getAllInvitacionesPartido,
    getInvitacionPartidoById
};