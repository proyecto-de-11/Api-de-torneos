import * as partidoModel from '../models/partido.js';


/**
 * Controlador para la creación de un nuevo partido.
 * Valida los datos de entrada y llama al modelo para la inserción.
 */
const createPartido = async (req, res) => {
    
    // Desestructuración de los datos del body (POST)
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
    } = req.body;

    // Validación mínima de campos obligatorios 
    // Los campos equipo_visitante_id y fecha_partido son NOT NULL en tu tabla.
    if (!equipo_visitante_id || !fecha_partido) {
        return res.status(400).json({ message: 'Los IDs de equipo y la fecha del partido son obligatorios.' });
    }

    // Objeto de datos que se enviará al modelo (coincide con la desestructuración)
    const partidoData = {
        creado_por, 
        equipo_local_id, 
        equipo_visitante_id, 
        reserva_id, 
        torneo_id, 
        tipo_partido, 
        fecha_partido, 
        hora_inicio, 
        // Si duracion_minutos no viene, el modelo tomará el default de la DB (90)
        duracion_minutos, 
        resultado_local, 
        resultado_visitante, 
        estado, 
        observaciones
    };

    try {
      
        // Llamar al método del modelo para crear el partido
        const newPartidoId = await partidoModel.createPartido(partidoData);

        // Respuesta exitosa (201 Created)
        res.status(201).json({ 
            message: 'Partido programado exitosamente', 
            partidoId: newPartidoId 
        });
        
    } catch (error) {
        
        //  Manejo de errores
        console.error(" ERROR FATAL CAPTURADO :", error);
        
        res.status(500).json({
            message: 'Error al crear el partido',
            error: error.message,
            detail: "Verifique el error en la terminal de Node.js."
        });
    }
};
/**
 * Controlador para la edición de un partido existente.
 */
const updatePartidoController = async (req, res) => {
    const partidoId = req.params.id; 
    const partidoData = req.body; // El modelo se encarga de filtrar los campos

    if (!partidoId || Object.keys(partidoData).length === 0) {
        return res.status(400).json({ 
            message: 'El ID y al menos un campo a actualizar son obligatorios.' 
        });
    }

    try {
        // Llamada correcta usando el alias de importación
        const affectedRows = await partidoModel.updatePartido(partidoId, partidoData);

        if (affectedRows === 0) {
            return res.status(404).json({ message: `Partido con ID ${partidoId} no encontrado o no se realizaron cambios.` });
        }

        res.status(200).json({ 
            message: 'Partido actualizado exitosamente', 
            partidoId: partidoId,
            filas_afectadas: affectedRows 
        });
        
    } catch (error) {
        console.error(" ERROR FATAL AL ACTUALIZAR PARTIDO :", error);
        
        // Manejo de errores de MySQL, mostrando un mensaje útil
        const errorMessage = error.sqlMessage || error.message; 
        
        res.status(500).json({
            message: 'Error al actualizar el partido',
            error: errorMessage,
            detail: "Verifique el error en la terminal de Node.js."
        });
    }
};

/**
 * Controlador para obtener la lista completa de todos los partidos.
 */
const getAllPartidosController = async (req, res) => {
    try {
        // Llamada al método del modelo
        const partidos = await partidoModel.getAllPartidos();

        if (partidos.length === 0) {
            // Si la consulta devuelve un array vacío
            return res.status(404).json({ message: 'No se encontraron partidos registrados.' });
        }

        // Respuesta exitosa (200 OK)
        res.status(200).json({ 
            message: 'Partidos obtenidos exitosamente', 
            total: partidos.length,
            data: partidos 
        });
        
    } catch (error) {
        
        console.error(" ERROR FATAL AL OBTENER PARTIDOS :", error);
        
        // Respuesta de error interno del servidor
        res.status(500).json({
            message: 'Error al obtener la lista de partidos',
            error: error.message,
            detail: "Verifique el error en la terminal de Node.js."
        });
    }
};

/**
 * Controlador para obtener un partido específico por su ID.
 */
const getPartidoByIdController = async (req, res) => {
    // Obtener el ID del partido desde los parámetros de la ruta
    const partidoId = req.params.id; 

    // Validación básica del ID
    if (!partidoId) {
        return res.status(400).json({ message: 'El ID del partido es obligatorio.' });
    }

    try {
        // Llamada al método del modelo
        const partido = await partidoModel.getPartidoById(partidoId);

        if (!partido) {
            // 404 Not Found si el ID no existe en la base de datos
            return res.status(404).json({ message: `Partido con ID ${partidoId} no encontrado.` });
        }

        // 200 OK
        res.status(200).json({ 
            message: 'Partido obtenido exitosamente', 
            data: partido 
        });
        
    } catch (error) {
        
        console.error(` ERROR FATAL AL OBTENER PARTIDO (ID: ${partidoId}) :`, error);
        
        res.status(500).json({
            message: 'Error al obtener el partido',
            error: error.message,
            detail: "Verifique el error en la terminal de Node.js."
        });
    }
};

export{
    createPartido,
    updatePartidoController,
    getAllPartidosController,
    getPartidoByIdController
};