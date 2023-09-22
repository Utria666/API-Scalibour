import {pool} from '../db.js'

export const getAvailableRooms = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT habitaciones.habitacion_Id, habitaciones.numero_habitacion, habitaciones.imagen, tipo_habitaciones.nombre_tipo_habitacion, tipo_habitaciones.descripcion, tipo_habitaciones.precio_base, tipo_habitaciones.capacidad, estado_habitacion.nombre FROM habitaciones INNER JOIN tipo_habitaciones ON habitaciones.tipo_habitacion_id = tipo_habitaciones.tipo_habitacion_id INNER JOIN estado_habitacion ON habitaciones.id_estado = estado_habitacion.id_estado WHERE habitaciones.id_estado = 1 ORDER BY habitaciones.habitacion_Id ASC;'
    );
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
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

export const updateRoomStatus = async () => {
    try {
      // Obtener todas las reservas activas para la fecha actual
      const currentDate = new Date().toISOString().split('T')[0];
      const [activeReservations] = await pool.query(
        'SELECT * FROM reservas WHERE inicio_reserva <= ? AND final_reserva >= ?',
        [currentDate, currentDate]
      );
  
      // Obtener todas las habitaciones
      const [rooms] = await pool.query('SELECT * FROM habitaciones');
  
      // Iterar a través de las habitaciones y actualizar sus estados
      rooms.forEach(async (room) => {
        const roomReservations = activeReservations.filter(
          (reservation) => reservation.habitacion_Id === room.habitacion_Id
        );
  
        if (roomReservations.length > 0) {
          // Si hay reservas activas para esta habitación, establecer el estado como "Reservado"
          await pool.query('UPDATE habitaciones SET id_estado = 2 WHERE habitacion_Id = ?', [
            room.habitacion_Id,
          ]);
        } else if (room.id_estado === 2) {
          // Si no hay reservas activas y el estado actual es "Reservado", establecer el estado como "Disponible"
          await pool.query('UPDATE habitaciones SET id_estado = 1 WHERE habitacion_Id = ?', [
            room.habitacion_Id,
          ]);
        }
      });
  
      console.log('Estado de las habitaciones actualizado correctamente.');
    } catch (error) {
      console.error('Error al actualizar el estado de las habitaciones:', error);
    }
  };