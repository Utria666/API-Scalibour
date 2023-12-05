//Trae la clase Routes para definir rutas
import { Router } from "express"; 

//Importa los metodos definidos en roomStatus controller
import { getRoomsStatus, getRoomStatus, createRoomStatus, updateRoomStatus, deleteRoomStatus } from "../controllers/roomStatus.controller.js";

//Define la clase en una variable
const router = Router();

//Asigna extensiones de roomstatus para poder dar uso a sus metodos
router.get('/roomStatus', getRoomsStatus)

router.get('/roomStatus/:id_estado', getRoomStatus)

router.post('/roomStatus', createRoomStatus)

router.patch('/roomStatus/:id_estado', updateRoomStatus)

router.delete('/roomStatus/:id_estado', deleteRoomStatus)

//Exporta todas las extensiones para que puedas ser usadas
export default router;