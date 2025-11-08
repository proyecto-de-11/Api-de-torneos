// database.js (Conexión usando 'mysql2' y el método pool, recomendado para APIs)

import mysql from 'mysql2';

// Configuración de la conexión a la base de datos BdTorneos
const pool = mysql.createPool({
    host: 'localhost',      // <--- ¡CORRECCIÓN! El host es tu máquina local
    port: 3306,             // <--- ¡AGREGADO! El puerto es 3306
    user: 'root', 
    password: 'yyyyyyyy', 
    database: 'bdtorneos',  // Nota: asegúrate de que el nombre sea 'BdTorneos' y no 'bdtorneos' (MySQL es case-insensitive en Windows/macOS, pero sensible en Linux)
    
    waitForConnections: true,
    connectionLimit: 10,     
    queueLimit: 0
});

// Intentar obtener una conexión para verificar que funciona
pool.getConnection((err, connection) => {
    if (err) {
        // Manejar el error de conexión inicial
        console.error('❌ Error al conectar a MySQL:', err.message);
        // Puedes agregar lógica para salir de la aplicación si es un error fatal
        // process.exit(1); 
        return;
    }
    
    console.log('✅ Conexión exitosa a MySQL (Pool creado).');
    
    // La conexión se libera automáticamente si usas pool.query, 
    // pero si usas getConnection, debes liberarla
    connection.release();
});

export default pool.promise();