import * as deporteModel from '../models/tipoDeporte.js';

const createTipoDeport = async (req, res) => {
   
    const { 
        nombre, 
        descripcion = null, 
        icono = null,       
        esta_activo 
    } = req.body;

   
    const isActiveValue = esta_activo ? 1 : 0; // Garantiza un 1 o 0

    if (!nombre) {
        return res.status(400).json({ message: 'Nombre del deporte es obligatorio' });
    }

    try {
     
        const newDeporteId = await deporteModel.createTipoDeport({
            nombre,
            descripcion,
            icono,
            esta_activo: isActiveValue 
        });


        res.status(201).json({ message: 'Deporte creado exitosamente', deporteId: newDeporteId });
    } catch (error) {
        
        console.error("❌❌ ERROR FATAL CAPTURADO ❌❌:", error);
        
    
        res.status(500).json({
            message: 'Error al crear el deporte',
            error: error.message,
            detail: "Verifique el error en la terminal de Node.js."
        });
    }
};

const deleteTipoDeport = async (req, res) => {
    const deporteId = req.params.id; 

    if (!deporteId || isNaN(deporteId)) {
        return res.status(400).json({ message: 'ID de deporte no válido o faltante' });
    }

    try {
       
        const affectedRows = await deporteModel.deleteTipoDeport(deporteId);

       
        if (affectedRows === 0) {
           
            return res.status(404).json({ message: `No se encontró el deporte con ID ${deporteId}` });
        }

       
        res.status(200).json({ 
            message: `Deporte con ID ${deporteId} eliminado exitosamente`,
            deletedId: deporteId 
        });

    } catch (error) {
        console.error("❌❌ ERROR FATAL CAPTURADO ❌❌:", error);
        

        res.status(500).json({
            message: 'Error al intentar eliminar el deporte',
            error: error.message,
            detail: "Verifique el error en la terminal de Node.js."
        });
    }
};

export {
    createTipoDeport,
    deleteTipoDeport
};