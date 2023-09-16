import {Router} from "express"; 
import { getRoomsStatus, getRoomStatus, createRoomStatus, updateRoomStatus, deleteRoomStatus } from "../controllers/roomStatus.controller";

const router = Router();

router.get('/roles', getRoomsStatus)

router.get('/roles:id', getRoomStatus)

/*
router.post('/roles', createRoomStatus)

router.patch('/roles:id', updateRoomStatus)

router.delete('/roles:id', deleteRoomStatus)
*/

export default router;