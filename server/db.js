//  Importa la clase Pool desde mysql2
import {createPool} from 'mysql2/promise'

//  Trae las variables asignadas del archivo config.js para que pueda localizar la bd y crear la conexion de datos
import {
    DB_HOST,
    DB_USER,
    DB_PORT, 
    DB_PASSWORD,
    DB_DATABASE,

} from'./config.js'

//  Le asgina a las columnas valores para que cree nuestra conexion 
export const pool = createPool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE
})
