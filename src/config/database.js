// database.js ---------------mysql localllll-----------------

/*import mysql from 'mysql2';

// Configuración de la conexión a la base de datos BdTorneos
const pool = mysql.createPool({
    host: 'localhost', 
    port: 3306,                                     
    user: 'jasson', 
    password: '123456', 
    database: 'bdtorneos', 
    
    waitForConnections: true,
    connectionLimit: 10, 
    queueLimit: 0
});


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
export default pool;*/
//------------------------------------------------------------------
// config/db.js
import mysql from 'mysql2/promise';
import 'dotenv/config';

// Crear un pool de conexiones
const pool = mysql.createPool({
    uri: process.env.DATABASE_URL, 
    waitForConnections: true,
    connectionLimit: 10, 
    queueLimit: 0
});

console.log(' Módulo de MySQL configurado y listo.');

export default pool;