import axios from "./axios";

export const registerRequest = (user) => axios.post(`/users`, user)

export const loginRequest = (user) => axios.post(`/userslogin`, user)

export const verifyTokenRequest= () => axios.get(`/auth/verify`)