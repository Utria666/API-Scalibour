import { Router } from "express";
import { getUsers,createUser,updateUser,deleteUser,getUser,loginUser} from "../controllers/users.controller.js";


const router = Router();

router.get('/users',getUsers )

router.get('/users/:cliente_id',getUser )

router.get('/userslogin',loginUser )

router.post('/users', createUser)

router.patch('/users/:cliente_id', updateUser)

router.delete('/users/:cliente_id',deleteUser)

export default router;