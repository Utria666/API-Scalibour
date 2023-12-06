//Importa la clase Router para poder definir rutas
import { Router } from "express";

//Trae los metodos anteriormente predefinidos en el archivo bookings.controller.js
import {getBookings, getBooking, createBooking, updateBooking, deleteBooking} from "../controllers/bookings.controller.js"

//Renombra la clase a una variable
const router = Router();

//Crea extensiones para el uso de cada uno de los metodos sobre Booking
router.get('/bookings', getBookings)

router.get('/bookings/:id', getBooking)

router.post('/bookings', createBooking)

router.patch('/bookings/:id', updateBooking)

router.delete('/bookings/:id', deleteBooking)

//Exporta todas las extensioones a la app general para darle uso 
export default router;