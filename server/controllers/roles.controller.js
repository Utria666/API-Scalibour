import {pool} from '../db.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'

export const getRoles = async(req, res) => {
    try {
        const [rows] = await pool.query(SELECT * FROM `rol`)
        res.json(rows)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getRole = async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM `rol` WHERE id_rol = ?',[req.params.id_rol])
        if(rows.length <= 0) return res.status(400).json({message: `Ningun rol encontrado con el id ${req.param.rol_id}`})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

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

 //PENDIENTES
/*

export const updateRole = async (req, res) => {
    try {
         const [rows] = await pool.query('')
         
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteRole = async (req, res) => {
    try {
         const [rows] = await pool.query('')
         
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const Role = async (req, res) => {
    try {
         const [rows] = await pool.query('')
         
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}*/