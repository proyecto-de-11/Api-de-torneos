import * as deporteModel from '../models/tipoDeporte.js';

const createTipoDeport = async (req, res) => {
   
    const { 
        nombre, 
        descripcion = null, 
        icono = null,       
        esta_activo 
    } = req.body;

    // 2. Conversión a 1 o 0 para MySQL TINYINT(1) / BOOLEAN
    const isActiveValue = esta_activo ? 1 : 0; // Garantiza un 1 o 0

    if (!nombre) {
        return res.status(400).json({ message: 'Nombre del deporte es obligatorio' });
    }

    try {
        // 3. Intenta crear el deporte (SIN VALIDACIÓN PREVIA)
        const newDeporteId = await deporteModel.createTipoDeport({
            nombre,
            descripcion,
            icono,
            esta_activo: isActiveValue 
        });

        // 4. Si llega aquí, todo está bien y se envía la respuesta.
        res.status(201).json({ message: 'Deporte creado exitosamente', deporteId: newDeporteId });
    } catch (error) {
        // 5. Si hay un error (ej. duplicado por la restricción UNIQUE de SQL, o cualquier otro error de DB)
        console.error("❌❌ ERROR FATAL CAPTURADO ❌❌:", error);
        
    
        res.status(500).json({
            message: 'Error al crear el deporte',
            error: error.message,
            detail: "Verifique el error en la terminal de Node.js."
        });
    }
};

export {
    createTipoDeport
};