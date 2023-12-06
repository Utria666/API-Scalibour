//Se importa el objeto 'Router' desde el modulo 'Express' para crear instancias de objetos de enrutador (organizar y manejar las rutas en una aplicacion)
import { Router } from "express";

//Se importan las funciones creadas en la carpeta controller 
import { getUsers, createUser, updateUser, deleteUser, getUser, loginUser } from "../controllers/users.controller.js";

//Importa la funcion 'tokenExists' desde la ruta para implementar un middleware y validar la existencia de un token de autenticación 
import { tokenExists } from "../middlewares/validateToken.js";

//Instancia de 'Router'
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
