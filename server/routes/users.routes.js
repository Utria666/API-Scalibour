import { Router } from "express";
import { getUsers,createUser,updateUser,deleteUser,getUser,loginUser} from "../controllers/users.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get('/users',authRequired,getUsers )

router.get('/users/:cliente_id',authRequired,getUser )

router.post('/userslogin',loginUser )

router.post('/users', createUser)

router.patch('/users/:cliente_id',authRequired,updateUser)

router.delete('/users/:cliente_id',authRequired,deleteUser)

export default router;