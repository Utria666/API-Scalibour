//Importa una clave del archivo config.js
import { SECRETKEY } from "../config.js";

//Importa la funcion que va a crear token, en base de archivos json
import jwt from "jsonwebtoken";


//Metodo para crear el token que solicita un json como parametro, genera una promesa que tiene dos tipos de respuesta, añadiendole a la funcion jwt el "sign", este crea con los campos de el token que se le paso, la contrasena del json, y en caso de hayar un error elegira la opcion de reject, si no devovera el tocken construido.

export function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign( payload, 
            SECRETKEY,
            (err, token) => {
            if (err) reject(err);
            resolve(token);
        });
    })
}
