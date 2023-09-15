import axios from "axios";

const API = 'http://localhost:3000/api'


export const resgiterRequest = user => axios.post(`${API}/users`, user)
