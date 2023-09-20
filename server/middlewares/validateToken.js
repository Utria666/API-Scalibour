import jwt from "jsonwebtoken";
import { SECRETKEY } from "../config.js";

export const authRequired = (req, res, next) => {
  
    const { token } = req.cookies;

    if (!token)
     return res
    .status(401)
    .json({ message: "Unauthorized" });

    jwt.verify(token, SECRETKEY, (err, user) => {
      if (err)return res.status(401).json({ message: "Token is not valid" });

      console.log(user);
      next();
    });

};
