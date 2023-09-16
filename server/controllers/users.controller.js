import {pool} from '../db.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'

export const getUsers = async(req, res) => {
    try {
        const [rows] =await pool.query('SELECT * FROM `clientes`')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getUser = async(req, res) => {
    try {
        const [rows] =await pool.query('SELECT * FROM `clientes` WHERE cliente_id = ?',[req.params.cliente_id])
        if(rows.length <= 0)return res.status(404).json({message: `No se encontro ningun usuario por el id: ${req.params.cliente_id}`}) 
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const createUser = async (req, res) => {
    const {identificacion, nombres, correo, clave, id_rol} = req.body

    try {
        
        const passwordHash = await bcrypt.hash(clave, 10)
        const [rows] = await pool.query('INSERT INTO `clientes` (`identificacion`, `nombres`, `correo`, `clave`, `id_rol`) VALUES(?,?,?,?,?)',[identificacion, nombres, correo, passwordHash, id_rol])
        const token =  await createAccessToken(rows.insertId)
        res.cookie('token', token)
        res.send({
            cliente_id:rows.insertId,
            identificacion, 
            nombres, 
            correo, 
            clave, 
            id_rol
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

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
            clave
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}