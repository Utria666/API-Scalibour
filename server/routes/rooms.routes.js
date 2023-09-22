import { Router } from "express";
import { getRooms,getRoom,createRoom,updateRoom,deleteRoom,getAvailableRooms} from "../controllers/rooms.controller.js";

const router = Router();

router.get('/rooms', getRooms)

router.get('/roomsA', getAvailableRooms)

router.get('/rooms/:id', getRoom)

router.post('/rooms', createRoom)

router.patch('/rooms/:id', updateRoom)

router.delete('/rooms/:id',deleteRoom)

export default router;