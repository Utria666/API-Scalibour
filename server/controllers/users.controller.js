//Importa la conexion con la BD MySQL, y así se comuniquen
import {
  pool
} from "../db.js";

//Importa el módulo "bcrypt" de la biblioteca "bcryptjs". bcryptjs es una biblioteca que proporciona funciones de hashing de contraseñas utilizando el algoritmo bcrypt.
import bcrypt from "bcryptjs";

//Importa la función "createAccessToken" desde un módulo llamado jwt.js ubicado en el directorio ../libs/. Esta relacionado con la generación de tokens de acceso utilizando el estándar JWT (JSON Web Tokens).
import {
  createAccessToken
} from "../libs/jwt.js";

//Funcion denominada "getUsers", asíncrona que toma 2 parámetros: 
// 1. 'req' el objeto de solicitud 
// 2. 'res' el objeto de respuesta 
export const getUsers = async (req, res) => {
  try {

    //Por ser asincrona se permite el uso de 'await' para gestionar las operaciones.|
    // Crea una constante donde se almacenara una consulta a la base de datos en la que selecciona los datos de las tablas 'clientes' y 'rol' y ordena los resultados. 

    const [rows] = await pool.query(
      "SELECT clientes.cliente_id, clientes.identificacion, clientes.nombres, clientes.correo, clientes.clave, rol.nombre_rol FROM `clientes` INNER JOIN rol ON clientes.id_rol = rol.id_rol ORDER BY clientes.cliente_id ASC;"
    );

    //Si la consulta se realiza con exito, se envia al cliente la respuesta en formato JSON
    res.json(rows);

    //Si courre un error durante la consulta o en otra parte del bloque Try, se debe enviar un mensaje con el estado HTTP 500
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

//Funcion denominada "getUser", asíncrona que toma 2 parámetros: 
// 1. 'req' el objeto de solicitud 
// 2. 'res' el objeto de respuesta
export const getUser = async (req, res) => {

  //El codigo que se encuentre dentro del try se ejecuta si fue exitoso
  try {

    //Por ser asincrona se permite el uso de 'await' para gestionar las operaciones.|
    // Crea una constante donde se almacenara una consulta a la base de datos en la que selecciona los datos de las tablas 'clientes' y 'rol', y utilizando el parámetro ('?) se filtran los resultados segun el valor que el cliente ingreso.  
    const [rows] = await pool.query(
      "SELECT clientes.cliente_id, clientes.identificacion, clientes.nombres, clientes.correo, clientes.clave, rol.nombre_rol FROM `clientes` INNER JOIN rol ON clientes.id_rol = rol.id_rol WHERE cliente_id = ?;",
      [req.params.cliente_id]
    );

    //En caso de que la consulta haya arrojado una cantidad igual o menor a 0, se debe indicar al cliente un status de HTTP 404 y un mensaje JSON
    if (rows.length <= 0)
      return res
        .status(404)
        .json({
          message: `No se encontro ningun usuario por el id: ${req.params.cliente_id}`,
        });

    // Si hay resultados, se responde al cliente con los datos del primer resultado en formato JSON
    res.json(rows[0]);

    //En caso de que ocurra un error durante la ejecucion de la consulta o en otra parte del bloque Try se debe capturar el error y responder al cliente con un stats HTTP 500 y un mensaje 
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};


//Funcion denominada "createUser", asíncrona que toma 2 parámetros: 
// 1. 'req' el objeto de solicitud 
// 2. 'res' el objeto de respuesta
export const createUser = async (req, res) => {

  //Se toman los datos necesarios para crear un nuevo usuario desde el cuerpo de solicitud.
  const {
    identificacion,
    nombres,
    correo,
    clave
  } = req.body;

  try {
    // Verificar si ya existe un usuario con la misma identificación
    // Por medio de una consulta a la base de datos se verifica si ya existe un usuario con la misma identificacion, de ser asi manda como respuesta al cliente un status HTTP 400 con un mensaje JSON 
    const [existingIdentificacion] = await pool.query(
      "SELECT * FROM `clientes` WHERE `identificacion` = ?",
      [identificacion]
    );

    if (existingIdentificacion.length > 0) {
      return res.status(400).json({
        message: "Ya existe un usuario con la misma identificación.",
      });
    }

    // Verificar si ya existe un usuario con el mismo correo
    // Por medio de una consulta a la base de datos se verifica si ya existe un usuario con el mismo correo, de ser asi manda como respuesta al cliente un status HTTP 400 con un mensaje JSON 
    const [existingCorreo] = await pool.query(
      "SELECT * FROM `clientes` WHERE `correo` = ?",
      [correo]
    );

    if (existingCorreo.length > 0) {
      return res.status(400).json({
        message: "Ya existe un usuario con el mismo correo.",
      });
    }

    // Si no existe, continuar con la inserción
    //Utilizando la biblioteca 'bcrypt' se hashea la contraseña antes de almacenarla en la base de datos
    const passwordHash = await bcrypt.hash(clave, 10);

    //Se inserta el nuevo usuario en la tabla 'clientes' con la informacion proporcionada y rol como predeterminado el "2" ya qye hace referencia a usuario. 
    const [rows] = await pool.query(
      "INSERT INTO `clientes` (`identificacion`, `nombres`, `correo`, `clave`, `id_rol`) VALUES(?,?,?,?,?)",
      [identificacion, nombres, correo, passwordHash, 2]
    );

    //Se crea un objeto con el id y rol del nuevo usuario y se genera un token de acceso.
    const userWithRole = {
      id: rows.insertId,
      rol: 2,
    };

    const token = await createAccessToken(userWithRole);

    //Se configura una cookie en la respuesta con el token de acceso y se responde al cliente con un objeto JSON con la informacion sobre el nuevo usuario creado
    res.cookie("token", token);
    res.send({
      cliente_id: rows.insertId,
      identificacion,
      nombres,
      correo,
    });

    //Si ocurre un error durante la consulta o en otra parte del bloque Try se debe capturar el error y responder al cliente con un status HTTP 500 
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

////Funcion denominada "deleteUser", asíncrona que toma 2 parámetros: 
// 1. 'req' el objeto de solicitud 
// 2. 'res' el objeto de respuesta
export const deleteUser = async (req, res) => {
  try {

    //Guarda en una constante una consulta de eliminación en la base de datos para eliminar un usuario cuyo id coincida con el valor que el usuario ingreso en los parámetros de la solicitud
    const [rows] = await pool.query(
      "DELETE FROM `clientes` WHERE cliente_id = ?",
      [req.params.cliente_id]
    );

    //Se verifica que 'rows' es menor o igual a 0, de ser así significa que nose eliminó ningún usuario por no haber encontrado algún usuario con el id ingresado y se da respuesta al cliente con un status HTTP 404 y un mensaje JSON
    if (rows.affectedRows <= 0)
      return res
        .status(404)
        .json({
          message: `No se pudo eliminar ningun usuario por el id: ${req.params.cliente_id}`,
        });

    //Si la eliminación se realizo con éxito, se brinda una respuesta al cliente con un mensaje
    res.send("Usuario eliminado");

  //Si ocurre un error durante la ejecucion de la consulta de base de datos o en otra parte del codigo en el bloque try se debe capturar el error y responder al cliente con un status HTTP 500
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};


//////Funcion denominada "updateUser", asíncrona que toma 2 parámetros: 
// 1. 'req' el objeto de solicitud 
// 2. 'res' el objeto de respuesta
export const updateUser = async (req, res) => {

  //Se extraen los datos necesarios para actualizar un usuario a partir de los parámetros de la solicitud (el Id para saber a que usuario realizar la modificacion) y el cuerpo de la solicitud (Que datos son los que se van a cambiar). 
  const {
    cliente_id
  } = req.params;
  const {
    identificacion,
    nombres,
    correo,
    clave,
    id_rol
  } = req.body;

  try {
    //Consulta de actualización en la base de datos para modificar los campos del usuario a partir de los datos proporcionados
    const [result] = await pool.query(
      "UPDATE `clientes` SET `identificacion`= IFNULL(?,identificacion), `nombres`= IFNULL(?,nombres), `correo`= IFNULL(?,correo), `clave`= IFNULL(?,clave), `id_rol`= IFNULL(?,id_rol) WHERE cliente_id = ?",
      [identificacion, nombres, correo, clave, id_rol, cliente_id]
    );

    //Después de realizar la actualización se verifica si el resultado es igual a 0, de ser así significa que no se actualizó ningún usuario debido a que no encontró el usuario por el id ingresado y se responde al cliente con un status HTTP 404 y un mensaje JSON
    if (result.affectedRows === 0)
      return res
        .status(404)
        .json({
          message: `No se pudo actualizar ningun usuario por el id: ${req.params.cliente_id}`,
        });
    
    //Se realiza una consulta de selección para obtener los datos actualizados del usuario 
    const [rows] = await pool.query(
      "SELECT * FROM `clientes` WHERE cliente_id = ?",
      [cliente_id]
    );

    //Se brinda respuesta al cliente del usuario con los datos actualizados 
    res.json(rows[0]);

  //Si ocurre algun error se captura y se responde al cliente con un status HTTP 500
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

//Funcion denominada "loginUser", asíncrona que toma 2 parámetros: 
// 1. 'req' el objeto de solicitud 
// 2. 'res' el objeto de respuesta
export const loginUser = async (req, res) => {

  //Se toman los datos necesarios para iniciar sesión a partir del cuerpo de la solicitud, el usuario brinda su correo y clave para iniciar sesión
  const {
    correo,
    clave
  } = req.body;

  try {

    //Se realiza una consulta a la base de datos para buscar un usuario con el correo electronico ingresado
    const [userFound] = await pool.query(
      "SELECT * FROM `clientes` WHERE correo = ?",
      [correo]
    );

    //Se realiza una validación para encontrar algún usuario con el correo electrónico proporcionado, de no ser así se responde al cliente con un status HTTP 404 y un mensaje JSON
    if (userFound.length <= 0)
      return res
        .status(404)
        .json({
          message: `No se encontro ningun usuario por el email: ${correo}`,
        });

    //La función 'bcrypt.compare' compara la contraseña proporcionada con la contraseña hasheada almacenada en la base de datos. Si no coinciden, se responde al cliente con un status HTTP 404 y un mensaje JSON
    const isMatch = await bcrypt.compare(clave, userFound[0].clave);
    if (!isMatch)
      return res.status(404).json({
        message: `Contraseña incorrecta`
      });

    
    //Se crea un objeto que representa al usuario con el id y rol para generar un token de acceso
    const userWithRole = {
      id: userFound[0].cliente_id,
      rol: userFound[0].id_rol,
    };

    const token = await createAccessToken(userWithRole);

    //Se configura una cookie en la respuesta con el token de acceso y se da respuesta al cliente con un objeto JSON el cual contiene información sobre el usuario autenticado
    res.cookie("token", token);
    res.send({
      id: userFound[0].cliente_id,
      correo,
    });

    //Si ocurre algun error se captura y se responde al cliente con un status HTTP 500
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};