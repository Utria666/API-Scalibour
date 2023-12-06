//Trae las librerias para 
import jwt from "jsonwebtoken";
import { SECRETKEY } from "../config.js";

//Valida que un tocken exista, crea una variable que va a solicitar cookies a ((la pagina web)?), si este token no existe devuelve un error decide no tiene autorizacion, procede a validar si la clave que traemos es correcta, si no nos retorna que no es valido. Solicita tener datos del usuario para guardarlo como cookie
export const tokenExists  = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token)
      return res.status(401).json({ message: "No token,authorization denied" });

    jwt.verify(token, SECRETKEY, (err, user) => {
      if (err) return res.status(401).json({ message: "Token is not valid" });

      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



