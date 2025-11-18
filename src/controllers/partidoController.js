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

export{
    createPartido
};