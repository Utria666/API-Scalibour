//Importa la conexion con BD, esto para que se comuniquen mutuamente
import {pool} from '../db.js'


//Intenta obtener con un try dentro de una funcion flecha, todos los datos de la tabla "rol", usa un select y los ordena de forma ascendente
export const getRoles = async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM `rol` ORDER BY `rol`.`id_rol` ASC')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


//Intenta responder con un objeto unico de rol con un parametro, en este caso siendo por el id_rol la informacion a filtrar, en caso de que no se encuentre retornara un caso de error
export const getRole = async(req, res) => {
    try {
        const [rows] =await pool.query('SELECT * FROM `rol` WHERE id_rol = ?',[req.params.id_rol]);
        if(rows.length <= 0) return res.status(400).json({message: `Ningun rol encontrado con el id ${req.params.id_rol}`})
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
 
//Creara un rol nuevo colocandole como parametro unico el metodo del rol y esta informacion de entrada se debe introducir mediante el cuerpo de la solicitud que se le hace a la api
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


//Solicita un identificador para identificar que objeto afectar/actualizar y tambien solicita los valores a remplazar para que sean insertados en el cuerpo de la peticion. Posterior a esto se realiza un SELECT mostrando los cambios realizados
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


//En la solicitud solictia un id para poder eliminar un registro, usa un DELETE y devuelve un mensaje confirmado si fue exitoso o ocjrrio un error en el proceso
export const deleteRole = async (req, res) => {
    try {
        const [rows] = await pool.query('DELETE FROM `rol` WHERE id_rol = ?', [req.params.id_rol])
        if(rows.affectedRows <= 0) return res.status(404).json({message: `No fue posible eliminar el rol id: ${req.params.id_rol}`})
         res.send('Rol eliminado')
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}