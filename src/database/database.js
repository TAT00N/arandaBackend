import mysql from "mysql2/promise"; 
import config from "../config.js"; 


const getConnection = async () => {
    try {
        const connection = await mysql.createConnection({
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.database
        });
        return connection; 
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw error; 
    }
};

export { getConnection };
