import axios from "./axios";

export const getRoomTypesRequest = () => axios.get(`/roomTypes`)

export const getRoomTypeRequest = (id) => axios.get(`/roomTypes/${id}`)

export const createRoomTypeRequest = (roomType) => axios.post(`/roomTypes`, roomType)

export const updateRoomTypeRequest = (id, roomType) => axios.put(`/roomTypes/${id}`, roomType)

export const deleteRoomTypeRequest = (id) => axios.delete(`/roomTypes/${id}`)
