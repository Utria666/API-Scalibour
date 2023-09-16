//Importa la conexion con BD
import {pool} from '../db.js'


//Metodo para obtener todos los datos de la tabla "estado_habitacion"
export const getRoomsStatus = async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM `estado_habitacion`')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


//Obtiene un estado especifico de acuerdo a su identificador
export const getRoomStatus = async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM `estado_habitacion` WHERE id_estado = ?',[req.params.id_estado])
        if(rows.length <= 0) return res.status(400).json({message: `Ningun estado de habitacion encontrado con el id ${req.param.id_estado}`})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}