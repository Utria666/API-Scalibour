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


//Crea un estado de habitacion con parametros del body el nombre de este nuevo
export const createRole = async (req, res) => {

    const {nombre_rol} = req.params.body
    try {
        const [rows] = await pool.query('INSERT INTO `rol` (`nombre_rol`) VALUES (?)', [nombre_rol])
        const token =  await createAccessToken(rows.insertId)
        res.cookie('token', token)
        res.send({
            id_rol:rows.insertId,
            nombre_rol
        })
         
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

/*

//Actualiza el rol especifico por el "id_rol" y en caso de no haber modificaciones en una columna la deja igual
export const updateRole = async (req, res) => {
    const {id_rol} = req.params; 
    const {nombre_rol} = req.body;
    
    try {
        const [result] = await pool.query('UPDATE `rol` SET `nombre_rol`IFNULL(?, nombre_rol) WHERE id_rol = ?', [nombre_rol, id_rol])
        if(result.affectedRows === 0) return res.status(404).json({message: `No fue posible actualizar ningun campo del rol: ${req.param.id_rol} `})
        const [rows] = await pool.query('SELECT * FROM `rol` WHERE id_rol = ?',[id_rol])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


//Elimina un rol por su id
export const deleteRole = async (req, res) => {
    try {
        const [rows] = await pool.query('DELETE FROM `rol` WHERE id = ?', [req.params.id_rol])
        if(rows.affectedRows <= 0) res.status(404).json({message: `No fue posible eliminar el rol id: ${req.params.id_rol}`})
        res.send('Rol eliminado')
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
*/