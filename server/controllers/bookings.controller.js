import {pool} from '../db.js'

export const getBookings = async(req, res) => {
    try{
        const [rows] = await pool.query('SELECT reservas.reservas_id, reservas.fecha_creacion_reserva, reservas.inicio_reserva, reservas.final_reserva, habitaciones.numero_habitacion, clientes.identificacion, clientes.nombres FROM reservas INNER JOIN habitaciones ON reservas.habitacion_id = habitaciones.habitacion_id INNER JOIN clientes ON reservas.cliente_id = clientes.cliente_id ORDER BY reservas.reservas_id ASC;')

        res.json(rows)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getBooking = async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT reservas.reservas_id, reservas.fecha_creacion_reserva, reservas.inicio_reserva, reservas.final_reserva, habitaciones.numero_habitacion, clientes.identificacion, clientes.nombres FROM reservas INNER JOIN habitaciones ON reservas.habitacion_id = habitaciones.habitacion_id INNER JOIN clientes ON reservas.cliente_id = clientes.cliente_id WHERE reservas_id = ?', [req.params.id])

        if (rows.length <= 0) return res.status(404).json({message: `No se encontro ninguna reserva por el id: ${req.params.id}`})
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const createBooking = async(req, res) => {
    const {inicio_reserva, final_reserva, habitacion_id, cliente_id} = req.body

    try {
        const [rows] = await pool.query('INSERT INTO `reservas` (`inicio_reserva`, `final_reserva`, `habitacion_id`, `cliente_id`) VALUES(?,?,?,?)', [inicio_reserva, final_reserva, habitacion_id, cliente_id])

        const [rows2] = await pool.query('SELECT reservas.reservas_id, reservas.fecha_creacion_reserva, reservas.inicio_reserva, reservas.final_reserva, habitaciones.numero_habitacion, clientes.identificacion, clientes.nombres FROM reservas INNER JOIN habitaciones ON reservas.habitacion_id = habitaciones.habitacion_id INNER JOIN clientes ON reservas.cliente_id = clientes.cliente_id WHERE reservas_id = ?', [rows.insertId])

        res.json(rows2[0])

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateBooking = async (req, res) => {
    const {id} = req.params
    const {inicio_reserva, final_reserva, habitacion_id, cliente_id} = req.body

    try {
        const [result] = await pool.query('UPDATE `reservas` SET `inicio_reserva` = IFNULL( ?, inicio_reserva ), `final_reserva` = IFNULL( ?, final_reserva ), `habitacion_id` = IFNULL( ?, habitacion_id ), `cliente_id` = IFNULL( ?, cliente_id ) WHERE reservas_id = ?', [inicio_reserva, final_reserva, habitacion_id, cliente_id, id])

        if(result.affectedRows === 0) return res.status(404).json({message: `No se pudo actualizar ninguna reserva por el id: ${req.params.id}`})

        const [rows] = await pool.query('SELECT reservas.reservas_id, reservas.fecha_creacion_reserva, reservas.inicio_reserva, reservas.final_reserva, habitaciones.numero_habitacion, clientes.identificacion, clientes.nombres FROM reservas INNER JOIN habitaciones ON reservas.habitacion_id = habitaciones.habitacion_id INNER JOIN clientes ON reservas.cliente_id = clientes.cliente_id WHERE reservas_id = ?', [id])

        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteBooking = async(req, res) => {
    try {
        const [rows] = await pool.query('DELETE FROM `reservas` WHERE reservas_id = ?', [req.params.id])

        if(rows.affectedRows <= 0) return res.status(404).json({message: `No se pudo eliminar ninguna reserva por el id: ${req.params.id}`})

        res.send(`Reserva eliminada`)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}