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

const updateTorneo = async (req, res) => {
    const torneoId = req.params.id; 
    const updateData = req.body;

    // 1. Validación básica del ID
    if (!torneoId || isNaN(torneoId)) {
        return res.status(400).json({ message: 'ID de torneo no válido o faltante' });
    }

    // 2. Si no se envía cuerpo, no hay nada que hacer
    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: 'Datos de actualización no proporcionados' });
    }

    try {
        // 3. Llama al modelo para ejecutar la actualización
        const affectedRows = await torneoModel.updateTorneo(torneoId, updateData);

        // 4. Verifica el resultado
        if (affectedRows === 0) {
            const existingTorneo = await torneoModel.getTorneoById(torneoId); 
            
            if (existingTorneo) {
                return res.status(200).json({ message: 'Torneo actualizado exitosamente (no se detectaron cambios en los datos)' });
            }
            
            return res.status(404).json({ message: `No se encontró el torneo con ID ${torneoId} para actualizar.` });
        }

        res.status(200).json({ 
            message: `Torneo con ID ${torneoId} actualizado exitosamente`,
            torneoId: torneoId 
        });

    } catch (error) {
        console.error("❌ ERROR al actualizar torneo ❌:", error);
        res.status(500).json({
            message: 'Error al intentar actualizar el torneo',
            error: error.message,
        });
    }
};

const deleteTorneo = async (req, res) => {
    const torneoId = req.params.id; 

    if (!torneoId || isNaN(torneoId)) {
        return res.status(400).json({ message: 'ID de torneo no válido o faltante' });
    }

    try {
       
        const affectedRows = await torneoModel.deleteTorneo(torneoId);

       
        if (affectedRows === 0) {
           
            return res.status(404).json({ message: `No se encontró el torneo con ID ${torneoId}` });
        }

       
        res.status(200).json({ 
            message: `Torneo con ID ${torneoId} eliminado exitosamente`,
            deletedId: torneoId 
        });

    } catch (error) {
        console.error("❌❌ ERROR FATAL CAPTURADO ❌❌:", error);
        

        res.status(500).json({
            message: 'Error al intentar eliminar el torneo',
            error: error.message,
            detail: "Verifique el error en la terminal de Node.js."
        });
    }
};

const getAllTorneos = async (req, res) => {
    try {
        
        const torneos = await torneoModel.getAllTorneos();

        // 2. Verificar si hay resultados
        if (torneos.length === 0) {
            // Si no hay torneos, devolvemos 200 OK con un array vacío
            return res.status(200).json([]);
        }

        // 3. Éxito
        res.status(200).json(torneos);

    } catch (error) {
        console.error("❌ ERROR al obtener la lista de torneos ❌:", error);
        res.status(500).json({
            message: 'Error interno del servidor al obtener torneos',
            error: error.message,
        });
    }
};

export {
    createTorneo,
    updateTorneo,
    deleteTorneo,
    getAllTorneos
};