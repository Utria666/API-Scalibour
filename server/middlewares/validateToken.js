import jwt from "jsonwebtoken";
import { SECRETKEY } from "../config.js";

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

export const isAdmin = (req, res, next) => {
    try {
      // Verificar si el token existe utilizando tokenExists
      tokenExists(req, res, () => {
        if (req.user && req.user.rol === 1) {
          // El usuario es administrador
          next();
        } else {
          res.status(403).json({ message: "No tienes permisos de administrador" });
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Error en la verificación de administrador" });
    }
  };
  
