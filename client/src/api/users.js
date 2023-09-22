import axios from "./axios";

export const getUsersRequest = () => axios.get(`/users`)

export const getUserRequest = (id) => axios.get(`/users/${id}`)

export const createUserRequest = (user) => axios.post(`/users`, user)

export const updateUserRequest = (id, user) => axios.patch(`/users/${id}`, user)

export const deleteUserRequest = (id) => axios.delete(`/users/${id}`)