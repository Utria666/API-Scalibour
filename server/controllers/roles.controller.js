//Importa la conexion con BD
import {pool} from '../db.js'


//Metodo para obtener todos los datos de la tabla "rol"
export const getRoles = async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM `rol` ORDER BY `rol`.`id_rol` ASC')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


//Obtiene un rol especifico de acuerdo a su identificador
export const getRole = async(req, res) => {
    try {
        const [rows] =await pool.query('SELECT * FROM `rol` WHERE id_rol = ?',[req.params.id_rol]);
        if(rows.length <= 0) return res.status(400).json({message: `Ningun rol encontrado con el id ${req.params.id_rol}`})
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


//Crea un rol pasandole en el body el nombre de este nuevo
export const createRole = async (req, res) => {

    const {nombre_rol} = req.body
    try {
        const [rows] = await pool.query('INSERT INTO `rol` (`nombre_rol`) VALUES (?)', [nombre_rol])
        res.send({
            id_rol:rows.insertId,
            nombre_rol
        })
         
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


//Actualiza el rol especifico por el "id_rol" y en caso de no haber modificaciones en una columna la deja igual
export const updateRole = async (req, res) => {
    const {id_rol} = req.params; 
    const {nombre_rol} = req.body;
    
    try {
        const [result] = await pool.query('UPDATE `rol` SET `nombre_rol`=IFNULL(?, nombre_rol) WHERE id_rol = ?', [nombre_rol, id_rol])
        if(result.affectedRows === 0) return res.status(404).json({message: `No fue posible actualizar ningun campo del rol: ${req.params.id_rol} `})
        const [rows] = await pool.query('SELECT * FROM `rol` WHERE id_rol = ?',[id_rol])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


//Elimina un rol por su id
export const deleteRole = async (req, res) => {
    try {
        const [rows] = await pool.query('DELETE FROM `rol` WHERE id_rol = ?', [req.params.id_rol])
        if(rows.affectedRows <= 0) return res.status(404).json({message: `No fue posible eliminar el rol id: ${req.params.id_rol}`})
         res.send('Rol eliminado')
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}