import { SECRETKEY } from "../config.js";
import jwt from "jsonwebtoken";

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
