import {pool} from '../db.js'

export const getRooms = async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT habitaciones.habitacion_Id, habitaciones.numero_habitacion, habitaciones.imagen, tipo_habitaciones.nombre_tipo_habitacion, tipo_habitaciones.descripcion, tipo_habitaciones.precio_base, tipo_habitaciones.capacidad, estado_habitacion.nombre FROM habitaciones INNER JOIN tipo_habitaciones ON habitaciones.tipo_habitacion_id = tipo_habitaciones.tipo_habitacion_id INNER JOIN estado_habitacion ON habitaciones.id_estado = estado_habitacion.id_estado ORDER BY habitaciones.habitacion_Id ASC;')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
} 

export const getRoom = async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT habitaciones.habitacion_Id, habitaciones.numero_habitacion, habitaciones.imagen, tipo_habitaciones.nombre_tipo_habitacion, tipo_habitaciones.descripcion, tipo_habitaciones.precio_base, tipo_habitaciones.capacidad, estado_habitacion.nombre FROM habitaciones INNER JOIN tipo_habitaciones ON habitaciones.tipo_habitacion_id = tipo_habitaciones.tipo_habitacion_id INNER JOIN estado_habitacion ON habitaciones.id_estado = estado_habitacion.id_estado WHERE habitacion_id = ?', [req.params.id])

        if (rows.length <= 0) return res.status(404).json({message: `No se encontro ninguna habitacion por el id: ${req.params.id}`})
        res.json(rows[0])
            
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const createRoom = async (req, res) => {
    const {numero_habitacion, imagen, tipo_habitacion_id, id_estado} = req.body

    try {
        const [rows] = await pool.query('INSERT INTO `habitaciones` (`numero_habitacion`, `imagen`, `tipo_habitacion_id`, `id_estado`) VALUES(?,?,?,?)', [numero_habitacion, imagen, tipo_habitacion_id, id_estado])

        const [rows2] = await pool.query('SELECT habitaciones.habitacion_Id, habitaciones.numero_habitacion, habitaciones.imagen, tipo_habitaciones.nombre_tipo_habitacion, tipo_habitaciones.descripcion, tipo_habitaciones.precio_base, tipo_habitaciones.capacidad, estado_habitacion.nombre FROM habitaciones INNER JOIN tipo_habitaciones ON habitaciones.tipo_habitacion_id = tipo_habitaciones.tipo_habitacion_id INNER JOIN estado_habitacion ON habitaciones.id_estado = estado_habitacion.id_estado WHERE habitacion_id = ?', [rows.insertId])

        res.json(rows2[0])

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateRoom = async (req, res) => {
    const {id} = req.params
    const {numero_habitacion, imagen, tipo_habitacion_id, id_estado} = req.body

    try {
        const [result] = await pool.query('UPDATE `habitaciones` SET `numero_habitacion` = IFNULL(?, numero_habitacion), `imagen` = IFNULL(?, imagen), `tipo_habitacion_id` = IFNULL(?, tipo_habitacion_id), `id_estado` = IFNULL(?, id_estado) WHERE habitacion_id = ?', [numero_habitacion, imagen, tipo_habitacion_id, id_estado, id])

        if(result.affectedRows === 0) return res.status(404).json({message: `No se pudo actualizar ninguna habitacion por el id: ${req.params.id}`})

        const [rows] = await pool.query('SELECT habitaciones.habitacion_Id, habitaciones.numero_habitacion, habitaciones.imagen, tipo_habitaciones.nombre_tipo_habitacion, tipo_habitaciones.descripcion, tipo_habitaciones.precio_base, tipo_habitaciones.capacidad, estado_habitacion.nombre FROM habitaciones INNER JOIN tipo_habitaciones ON habitaciones.tipo_habitacion_id = tipo_habitaciones.tipo_habitacion_id INNER JOIN estado_habitacion ON habitaciones.id_estado = estado_habitacion.id_estado WHERE habitacion_id = ?', [id])

        res.json(rows[0])
    }   catch (error) {
            return res.status(500).json({message: error.message})
    }
}


export const deleteRoom = async(req, res) => {
    try {
        const [rows] = await pool.query('DELETE FROM `habitaciones` WHERE habitacion_id = ?', [req.params.id])

        if(rows.affectedRows <= 0) return res.status(404).json({message: `No se pudo eliminar ninguna habitacion por el id: ${req.params.id}`})
        
        res.send('Habitacion eliminada')
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}