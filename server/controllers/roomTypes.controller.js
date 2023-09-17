import {pool} from '../db.js'

export const getRoomTypes = async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM `tipo_habitaciones` ORDER BY `tipo_habitaciones`.`tipo_habitacion_id` ASC')

        res.json(rows)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getRoomType = async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM `tipo_habitaciones` WHERE tipo_habitacion_id = ?', [req.params.id])
        if(rows.length <= 0) return res.status(404).json({message: `No se encontro ningun tipo de habitacion por el id: ${req.params.id}`})
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const createRoomType = async (req, res) => {
    const {nombre_tipo_habitacion, descripcion, precio_base, capacidad} = req.body
    
    try {
        const [rows] = await pool.query('INSERT INTO `tipo_habitaciones` (`nombre_tipo_habitacion`, `descripcion`, `precio_base`, `capacidad`) VALUES(?,?,?,?)', [nombre_tipo_habitacion, descripcion, precio_base, capacidad])

        res.send({
            tipo_habitacion_id:rows.insertId,
            nombre_tipo_habitacion,
            descripcion,
            precio_base,
            capacidad
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateRoomType = async (req, res) => {
    const {id} = req.params
    const {nombre_tipo_habitacion, descripcion, precio_base, capacidad} = req.body

    try {
        const [result] = await pool.query('UPDATE `tipo_habitaciones` SET `nombre_tipo_habitacion` = IFNULL(?, nombre_tipo_habitacion), `descripcion` = IFNULL(?, descripcion), `precio_base` = IFNULL(?, precio_base), `capacidad` = IFNULL(?, capacidad) WHERE tipo_habitacion_id = ?', [nombre_tipo_habitacion, descripcion, precio_base, capacidad, id])

        if(result.affectedRows === 0) return res.status(404).json({message: `No se pudo actualizar ningun tipo de habitacion por el id: ${req.params.id}`})

        const [rows] = await pool.query('SELECT * FROM `tipo_habitaciones` WHERE tipo_habitacion_id = ?', [id])

        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteRoomType = async (req, res) => {
    try {
        const [rows] = await pool.query('DELETE FROM `tipo_habitaciones` WHERE tipo_habitacion_id = ?', [req.params.id])

        if(rows.affectedRows <= 0) return res.status(404).json({message: `No se pudo eliminar ningun tipo de habitacion por el id: ${req.params.id}`})

        res.send('Tipo de habitacion eliminada')
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}