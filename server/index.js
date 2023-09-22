import app from './app.js'
import {PORT} from'./config.js'
import cron from 'node-cron';
import { updateRoomStatus } from "./controllers/rooms.controller.js";

cron.schedule('*/10 * * * * *', async() => {
  await updateRoomStatus();
});

app.listen(PORT)
console.log('Server on port',PORT);