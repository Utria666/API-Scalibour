import { Router } from "express";
import { getUsers, createUser, updateUser, deleteUser, getUser, loginUser } from "../controllers/users.controller.js";
import { tokenExists } from "../middlewares/validateToken.js";

const router = Router();

// Rutas que no requieren autenticación
router.post('/userslogin', loginUser);
router.post('/users', createUser);

// Aplicar tokenExists a todas las siguientes rutas
router.use(tokenExists);

router.get('/users', getUsers);
router.get('/users/:cliente_id', getUser);
router.patch('/users/:cliente_id', updateUser);
router.delete('/users/:cliente_id', deleteUser);

export default router;
