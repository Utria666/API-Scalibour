import {pool} from '../db.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'

export const getUsers = async(req, res) => {
    try {
        const [rows] =await pool.query('SELECT clientes.cliente_id, clientes.identificacion, clientes.nombres, clientes.correo, clientes.clave, rol.nombre_rol FROM `clientes` INNER JOIN rol ON clientes.id_rol = rol.id_rol ORDER BY clientes.cliente_id ASC;')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getUser = async(req, res) => {
    try {
        const [rows] =await pool.query('SELECT clientes.cliente_id, clientes.identificacion, clientes.nombres, clientes.correo, clientes.clave, rol.nombre_rol FROM `clientes` INNER JOIN rol ON clientes.id_rol = rol.id_rol WHERE cliente_id = ?;',[req.params.cliente_id])
        if(rows.length <= 0)return res.status(404).json({message: `No se encontro ningun usuario por el id: ${req.params.cliente_id}`}) 
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const createUser = async (req, res) => {
    const { identificacion, nombres, correo, clave } = req.body;
  
    try {
     // Verificar si ya existe un usuario con la misma identificación
    const [existingIdentificacion] = await pool.query(
        'SELECT * FROM `clientes` WHERE `identificacion` = ?',
        [identificacion]
      );
  
      if (existingIdentificacion.length > 0) {
        return res.status(400).json({
          message: 'Ya existe un usuario con la misma identificación.',
        });
      }
  
      // Verificar si ya existe un usuario con el mismo correo
      const [existingCorreo] = await pool.query(
        'SELECT * FROM `clientes` WHERE `correo` = ?',
        [correo]
      );
  
      if (existingCorreo.length > 0) {
        return res.status(400).json({
          message: 'Ya existe un usuario con el mismo correo.',
        });
      }
  
      // Si no existe, continuar con la inserción
      const passwordHash = await bcrypt.hash(clave, 10);
      const [rows] = await pool.query(
        'INSERT INTO `clientes` (`identificacion`, `nombres`, `correo`, `clave`) VALUES(?,?,?,?)',
        [identificacion, nombres, correo, passwordHash]
      );
  
      const token = await createAccessToken(rows.insertId);
      res.cookie('token', token);
      res.send({
        cliente_id: rows.insertId,
        identificacion,
        nombres,
        correo,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  

export const deleteUser = async(req, res) =>{
    try {
        const [rows] =await pool.query('DELETE FROM `clientes` WHERE cliente_id = ?',[req.params.cliente_id])
        if(rows.affectedRows <= 0)return res.status(404).json({message: `No se pudo eliminar ningun usuario por el id: ${req.params.cliente_id}`})
        res.send('Usuario eliminado')
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateUser = async (req, res) =>{
    const {cliente_id} =req.params
    const {identificacion, nombres, correo, clave, id_rol} = req.body

    try {
        const [result] = await pool.query('UPDATE `clientes` SET `identificacion`= IFNULL(?,identificacion), `nombres`= IFNULL(?,nombres), `correo`= IFNULL(?,correo), `clave`= IFNULL(?,clave), `id_rol`= IFNULL(?,id_rol) WHERE cliente_id = ?',[identificacion, nombres, correo, clave, id_rol, cliente_id])
        if(result.affectedRows === 0) return res.status(404).json({message: `No se pudo actualizar ningun usuario por el id: ${req.params.cliente_id}`})
        const [rows] = await pool.query('SELECT * FROM `clientes` WHERE cliente_id = ?',[cliente_id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const loginUser = async (req, res) => {
    const {correo, clave} = req.body

    try {
        const [userFound] = await pool.query('SELECT * FROM `clientes` WHERE correo = ?',[correo])
        if(userFound.length <= 0)return res.status(404).json({message: `No se encontro ningun usuario por el email: ${correo}`})
        
        const isMatch = await bcrypt.compare(clave, userFound[0].clave)
        if(!isMatch)return res.status(404).json({message: `Contraseña incorrecta`})
        
        const token =  await createAccessToken(userFound[0].cliente_id)
        res.cookie('token', token)
        res.send({
            id:userFound[0].cliente_id,
            correo,
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}