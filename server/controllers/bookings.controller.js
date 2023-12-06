//Importa la conexion con BD

import {pool} from '../db.js'

//Trae los registros de reservas usando un SELECT y seleccionando los campos necesarios.

export const getBookings = async(req, res) => {
    try{
        const [rows] = await pool.query('SELECT reservas.reservas_id, reservas.fecha_creacion_reserva, reservas.inicio_reserva, reservas.final_reserva, habitaciones.numero_habitacion, clientes.identificacion, clientes.nombres FROM reservas INNER JOIN habitaciones ON reservas.habitacion_id = habitaciones.habitacion_id INNER JOIN clientes ON reservas.cliente_id = clientes.cliente_id ORDER BY reservas.reservas_id ASC;')

        res.json(rows)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

//Genera el metodo para traer un registro unico por su id, no trae cada una de las columnas, no trae todas las columnas, si no encuentra el regitro por el id la const quedara vacia por ende generara un error de busqueda

export const getBooking = async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT reservas.reservas_id, reservas.fecha_creacion_reserva, reservas.inicio_reserva, reservas.final_reserva, habitaciones.numero_habitacion, clientes.identificacion, clientes.nombres FROM reservas INNER JOIN habitaciones ON reservas.habitacion_id = habitaciones.habitacion_id INNER JOIN clientes ON reservas.cliente_id = clientes.cliente_id WHERE reservas_id = ?', [req.params.id])

        if (rows.length <= 0) return res.status(404).json({message: `No se encontro ninguna reserva por el id: ${req.params.id}`})
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

//Metodo para crear nuevas reservas, los campos seran leidos en el body de la peticion, y finalmente retornandolo para observar cual registro acaba de ingresar

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


//Actualiza el registro mediante un identificador unico, solicita por el body aquellos campos que desean ser remplzados, aquellos campo que no deseen ser remplazados, les dejara el mismo valor ya existente. Luego a esto reotrna el objeto con sus columnas ya actualizadas
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

//Elimina registros manejando un unico identificador, en caso de no existir, retornara un error de consulta
export const deleteBooking = async(req, res) => {
    try {
        const [rows] = await pool.query('DELETE FROM `reservas` WHERE reservas_id = ?', [req.params.id])

        if(rows.affectedRows <= 0) return res.status(404).json({message: `No se pudo eliminar ninguna reserva por el id: ${req.params.id}`})

        res.send(`Reserva eliminada`)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}