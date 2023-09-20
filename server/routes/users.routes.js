import { Router } from "express";
import { getUsers,createUser,updateUser,deleteUser,getUser,loginUser} from "../controllers/users.controller.js";
import { isAdmin } from "../middlewares/validateToken.js";

const router = Router();

router.get('/users',isAdmin,getUsers )

router.get('/users/:cliente_id',isAdmin,getUser )

router.post('/userslogin',loginUser )

router.post('/users', createUser)

router.patch('/users/:cliente_id',isAdmin,updateUser)

router.delete('/users/:cliente_id',isAdmin,deleteUser)

export default router;