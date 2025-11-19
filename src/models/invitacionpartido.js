import pool from '../config/database.js';

/**
 * Crea un nuevo registro de invitación a partido en la base de datos.
 * @param {object} serviceData - Datos de la invitación a crear.
 * @returns {Promise<number>} - El ID de la invitación recién creada.
 * @throws {Error} - Si ocurre un error durante la inserción.
 */
const createInvitacionPartido = async (serviceData) => {
    // Desestructuración de los datos que coinciden con los campos de la tabla
    const { 
        partido_id, 
        equipo_invitado_id, 
        usuario_invito_id, 
        mensaje, 
        // Omitimos 'estado' ya que tiene un valor por defecto ('pendiente')
    } = serviceData;

    try {
        const [result] = await pool.query( 
            // Query SQL con los campos a insertar
            `INSERT INTO invitaciones_partido (
                partido_id, equipo_invitado_id, usuario_invito_id, mensaje
            ) VALUES (?, ?, ?, ?)`,
            [
                // Array de valores para los marcadores de posición
                partido_id, 
                equipo_invitado_id, 
                usuario_invito_id, 
                mensaje
            ]
        );
        
        // Retorna el ID generado para la nueva invitación
        return result.insertId;
        
    } catch (error) {
        // En el modelo, simplemente relanzamos el error
        throw error;
    }
};

export {
    createInvitacionPartido
};