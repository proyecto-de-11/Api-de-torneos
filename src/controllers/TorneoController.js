import * as torneoModel from '../models/Torneo.js';

const createTorneo = async (req, res) => {
   
    const { 
        creado_por, 
        nombre, 
        descripcion, 
        tipo_deporte_id, 
        categoria, 
        nivel, 
        formato, 
        max_equipos, 
        min_equipos, 
        premio_descripcion, 
        reglas, 
        fecha_inicio, 
        fecha_fin, 
        fecha_inscripcion_inicio,
        fecha_inscripcion_fin,
         costo_inscripcion, 
         ubicacion, 
         logo,
         estado

    } = req.body;


    if (!nombre) {
        return res.status(400).json({ message: 'Nombre del deporte es obligatorio' });
    }

    try {
     
        const newTorneoId = await torneoModel.createTorneo({
        creado_por, 
        nombre, 
        descripcion, 
        tipo_deporte_id, 
        categoria, 
        nivel, 
        formato, 
        max_equipos, 
        min_equipos, 
        premio_descripcion, 
        reglas, 
        fecha_inicio, 
        fecha_fin, 
        fecha_inscripcion_inicio,
        fecha_inscripcion_fin,
         costo_inscripcion, 
         ubicacion, 
         logo,
         estado
        });


        res.status(201).json({ message: 'Torneo creado exitosamente', TorneoId: newTorneoId });
    } catch (error) {
        
        console.error("❌❌ ERROR FATAL CAPTURADO ❌❌:", error);
        
    
        res.status(500).json({
            message: 'Error al crear el Torneo',
            error: error.message,
            detail: "Verifique el error en la terminal de Node.js."
        });
    }
};

export {
    createTorneo
};