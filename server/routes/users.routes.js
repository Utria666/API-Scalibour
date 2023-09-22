import { Router } from "express";
import { getUsers,createUser,updateUser,deleteUser,getUser,loginUser} from "../controllers/users.controller.js";
import { tokenExists } from "../middlewares/validateToken.js";

const router = Router();

router.get('/users',tokenExists,getUsers )

router.get('/users/:cliente_id',tokenExists,getUser )

router.post('/userslogin',loginUser )

router.post('/users', createUser)

router.patch('/users/:cliente_id',tokenExists,updateUser)

router.delete('/users/:cliente_id',tokenExists,deleteUser)

export default router;