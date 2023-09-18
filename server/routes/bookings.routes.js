import { Router } from "express";
import {getBookings, getBooking, createBooking, updateBooking, deleteBooking} from "../controllers/bookings.controller.js"

const router = Router();

router.get('/bookings', getBookings)

router.get('/bookings/:id', getBooking)

router.post('/bookings', createBooking)

router.patch('/bookings/:id', updateBooking)

router.delete('/bookings/:id', deleteBooking)

export default router;