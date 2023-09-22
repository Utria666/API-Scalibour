import { Router } from "express";

import { tokenExists } from "../middlewares/validateToken.js";

const router = Router();

router.get("/verify", tokenExists, (req, res) => {
  if (req.user) {
    res.send(true);
  } else {
    res.sendStatus(401);
  }
});

export default router;
