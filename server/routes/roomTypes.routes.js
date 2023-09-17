import { Router } from "express";
import { getRoomTypes, getRoomType, createRoomType, updateRoomType, deleteRoomType} from "../controllers/roomTypes.controller.js"

const router = Router();

router.get('/roomTypes', getRoomTypes)

router.get('/roomTypes/:id', getRoomType)

router.post('/roomTypes', createRoomType)

router.patch('/roomTypes/:id', updateRoomType)

router.delete('/roomTypes/:id', deleteRoomType)


export default router;