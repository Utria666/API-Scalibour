//Trae una funcion de express para establecer rutas
import { Router } from "express";

//crea la constante de la funcion
const router = Router();

//Crea un metodo que valide si ya existe una cookie con ese usuario o si debe volver a crearla como un usuario nuevo, retornara un error si no encuentra la cookie de usuario ????

//Realiza una solicitud que desea obtener True si puede obtener respuesta del usuario, si no retornara un error que informa que el recurso no fue encontrado
router.get("/verify", (req, res) => {
  if (req.user) {
    res.send(true);
  } else {
    res.sendStatus(401);
  }
});

export default router;
