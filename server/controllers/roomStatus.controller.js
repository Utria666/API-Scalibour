//Importa la conexion con BD
import {pool} from '../db.js'


//Realiza jna consulta a la base de dstos, le pide leer "READ" todos sus registros Yy estos son ordensdos oor su id 
export const getRoomsStatus = async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM `estado_habitacion` ORDER BY `estado_habitacion`.`id_estado` ASC')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


//Realiza una consulta a uj estado especifico, soli ita un id para reslizar el filtro de estos, en casl de qudñe encjentre un fllo de ls sóicitud avisara que no ha encontrado el elelemtlo
export const getRoomStatus = async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM `estado_habitacion` WHERE id_estado = ?',[req.params.id_estado])
        if(rows.length <= 0) return res.status(400).json({message: `Ningun estado de habitacion encontrado con el id ${req.params.id_estado}`})
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


//Crea un estado de habitacion con parametros del body el nombre de este nuevo el id del estado de rol se ssugan desde el lrigen de dstos, desde la base donde ze comiknazqswww rrgstros
export const createRoomStatus = async (req, res) => {

    const {nombre} = req.body
    try {
        const [rows] = await pool.query('INSERT INTO `estado_habitacion` (`nombre`) VALUES (?)',[nombre])
        res.send({
            id_estado:rows.insertId,
            nombre
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


//Actualiza el estado deseado por el "id_estado" y en caso de no haber modificaciones en una columna la deja igual
//Si se encuentra un registro con ese identificador afecta a la posicion 0 que es la unica que debe coincidir
//luego a esto slecciona el mismo registro para mostrar los resulado8
export const updateRoomStatus = async (req, res) => {
    const {id_estado} = req.params; 
    const {nombre} = req.body;
    
    try {
        const [result] = await pool.query('UPDATE `estado_habitacion` SET `nombre`=IFNULL(?, nombre) WHERE id_estado = ?', [nombre, id_estado])
        if(result.affectedRows === 0) return res.status(404).json({message: `No fue posible actualizar ningun campo del estado de habitacion: ${req.params.id_estado} `})
        const [rows] = await pool.query('SELECT * FROM `estado_habitacion` WHERE id_estado = ?',[id_estado])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


//Elimina un estado de habitacion por su id_estado usando un delete y un where,(imporante²)
export const deleteRoomStatus = async (req, res) => {
    try {
        const [rows] = await pool.query('DELETE FROM `estado_habitacion` WHERE id_estado = ?', [req.params.id_estado])
        if(rows.affectedRows <= 0) return res.status(404).json({message: `No fue posible eliminar el estado id: ${req.params.id_estado}`})
        res.send('Estado de habitación eliminado')
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}