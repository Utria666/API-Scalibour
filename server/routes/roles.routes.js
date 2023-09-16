import {Router} from "express"; 
import { getRoles, getRole, createRole, updateRole, deleteRole } from "../controllers/roles.controller";

const router = Router();

router.get('/roles', getRoles)

router.get('/roles:id', getRole)

router.post('/roles', createRole)

router.patch('/roles:id', updateRole)

router.delete('/roles:id', deleteRole)


export default router;