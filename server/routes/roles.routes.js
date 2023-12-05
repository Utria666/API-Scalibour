//Importa la clase Router para poder definir rutas
import { Router } from "express"; 

//Trae los metodos del archivo "roles.controller.js"
import { getRoles,getRole,createRole,updateRole,deleteRole } from "../controllers/roles.controller.js";

//renombra la clase a una variable
const routerRoles = Router();

//Define extensiones para cada uno de los metodos 

routerRoles.get('/roles', getRoles)

routerRoles.get('/roles/:id_rol',getRole)

routerRoles.post('/roles', createRole)

routerRoles.patch('/roles/:id_rol', updateRole)

routerRoles.delete('/roles/:id_rol', deleteRole)

//Exporta las rutas de solictudes para la "rol" 

export default routerRoles;