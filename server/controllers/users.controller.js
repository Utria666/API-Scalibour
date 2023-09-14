import {pool} from '../db.js'

export const getUsers = async(req, res) => {
    try {
        const [rows] =await pool.query('SELECT * FROM `users`')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getUser = async(req, res) => {
    try {
        const [rows] =await pool.query('SELECT * FROM `users` WHERE id = ?',[req.params.id])
        if(rows.length <= 0)return res.status(404).json({message: `No se encontro ningun usuario por el id: ${req.params.id}`}) 
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const createUser = async (req, res) => {
    const {name, email, password} = req.body
    try {
        const [rows] = await pool.query('INSERT INTO `users` (`name`, `email`, `password`) VALUES(?,?,?)',[name, email, password])
        res.send({
            id:rows.insertId,
            name,
            email,
            password
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteUser = async(req, res) =>{
    try {
        const [rows] =await pool.query('DELETE FROM `users` WHERE id = ?',[req.params.id])
        if(rows.affectedRows <= 0)return res.status(404).json({message: `No se pudo eliminar ningun usuario por el id: ${req.params.id}`})
        res.send('Usuario eliminado')
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateUser = async (req, res) =>{
    const {id} =req.params
    const {name, email, password} = req.body

    try {
        const [result] = await pool.query('UPDATE `users` SET `name`= IFNULL(?,name), `email`= IFNULL(?,email), `password`= IFNULL(?,password) WHERE id = ?',[name, email, password, id])
        if(result.affectedRows === 0) return res.status(404).json({message: `No se pudo actualizar ningun usuario por el id: ${req.params.id}`})
        const [rows] = await pool.query('SELECT * FROM `users` WHERE id = ?',[id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
