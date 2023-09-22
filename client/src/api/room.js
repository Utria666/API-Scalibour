import axios from "./axios";

export const getRoomsRequest = () => axios.get(`/rooms`);

export const getRoomsAvailableRequest = () => axios.get(`/roomsA`);

export const getRoomRequest = (id) => axios.get(`/rooms/${id}`);

export const createRoomRequest = (room) => axios.post(`/rooms`, room);

export const updateRoomRequest = (id, room) => axios.put(`/rooms/${id}`, room);

export const deleteRoomRequest = (id) => axios.delete(`/rooms/${id}`);