import express from 'express';
import cookieParser from "cookie-parser";
import usersRoutes from './routes/users.routes.js';
import indexRoutes from './routes/index.routes.js';
import roomsRoutes from './routes/rooms.routes.js';
import roomTypesRoutes from './routes/roomTypes.routes.js';
import rolesRoutes from './routes/roles.routes.js';
import roomStatusRoutes from './routes/roomStatus.routes.js';
import bookingsRoutes from './routes/bookings.routes.js'
import cors from 'cors';

const app = express();

app.use(cors(
    {
        origin: 'http://localhost:5173'
    }
))
app.use(express.json())
app.use(cookieParser());
app.use('/api',usersRoutes)
app.use('/api',indexRoutes)
app.use('/api',rolesRoutes)
app.use('/api',roomStatusRoutes)
app.use('/api',roomsRoutes)
app.use('/api',roomTypesRoutes)
app.use('/api',bookingsRoutes)

app.use((req,res,next)=>{
    res.status(404).json({
        message: 'Endpoint not found'
    })
})

export default app;