// database.js

import mysql from 'mysql2';

// Configuración de la conexión a la base de datos BdTorneos
const pool = mysql.createPool({
    host: 'localhost', 
    port: 3306, 
    user: 'root', 
    password: 'yyyyyyyy', 
    database: 'bdtorneos', 
    
    waitForConnections: true,
    connectionLimit: 10, 
    queueLimit: 0
});

// En lugar de usar pool.getConnection (que requiere liberación manual),
// puedes usar una promesa simple para verificar si el pool está vivo.
// O simplemente dejarlo así, ya que el pool.promise() es lo que necesitas.

// ❌ ELIMINA o COMENTA este bloque de código si es necesario
/* pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Error al conectar a MySQL:', err.message);
        return;
    }
    console.log('✅ Conexión exitosa a MySQL (Pool creado).');
    // Si usas pool.getConnection, debes liberarla, sino puede causar un "leak"
    connection.release(); 
});
*/

// 1. Usa pool.promise().query para verificar la conexión (más limpio)
pool.promise().query('SELECT 1')
    .then(() => {
        console.log('✅ Conexión exitosa a MySQL (Pool creado).');
    })
    .catch((err) => {
        console.error('❌ Error FATAL al conectar a MySQL:', err.message);
        // Si no se conecta, sal del proceso
        process.exit(1); 
    });


// Asegúrate de que estás exportando la versión con promesas
export default pool;