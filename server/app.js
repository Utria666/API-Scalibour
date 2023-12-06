import express from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors';
import {tokenExists} from './middlewares/validateToken.js';

// Importa tus routers
import usersRoutes from './routes/users.routes.js';
import indexRoutes from './routes/index.routes.js';
import roomsRoutes from './routes/rooms.routes.js';
import roomTypesRoutes from './routes/roomTypes.routes.js';
import rolesRoutes from './routes/roles.routes.js';
import roomStatusRoutes from './routes/roomStatus.routes.js';
import bookingsRoutes from './routes/bookings.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

// Configuraciones iniciales
app.use(cors({
    origin: 'http://localhost:4173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Rutas no protegidas
app.use('/api/auth', authRoutes);
app.use('/api', usersRoutes);
app.use('/api',indexRoutes)

// Crear un router para rutas protegidas
const protectedRoutes = express.Router();
protectedRoutes.use(tokenExists); // Aplicar middleware de autenticación

// Agregar rutas protegidas al router protegido
protectedRoutes.use('/', rolesRoutes);
protectedRoutes.use('/', roomStatusRoutes);
protectedRoutes.use('/', roomsRoutes);
protectedRoutes.use('/', roomTypesRoutes);
protectedRoutes.use('/', bookingsRoutes);

// Integrar las rutas protegidas en la aplicación
app.use('/api', protectedRoutes);

// Manejador de errores 404
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint not found'
    });
});

export default app;
