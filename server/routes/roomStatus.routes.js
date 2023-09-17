import { Router } from "express"; 
import { getRoomsStatus, getRoomStatus, createRoomStatus, updateRoomStatus, deleteRoomStatus } from "../controllers/roomStatus.controller.js";

const router = Router();

router.get('/roomStatus', getRoomsStatus)

router.get('/roomStatus/:id_estado', getRoomStatus)

router.post('/roomStatus', createRoomStatus)

router.patch('/roomStatus/:id_estado', updateRoomStatus)

router.delete('/roomStatus/:id_estado', deleteRoomStatus)


export default router;