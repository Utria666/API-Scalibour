import { Router } from "express"; 
import { getRoles,getRole,createRole,updateRole,deleteRole } from "../controllers/roles.controller.js";

const routerRoles = Router();

routerRoles.get('/roles', getRoles)

routerRoles.get('/roles/:id_rol',getRole)

routerRoles.post('/roles', createRole)

routerRoles.patch('/roles/:id_rol', updateRole)

routerRoles.delete('/roles/:id_rol', deleteRole)


export default routerRoles;