import { Router } from "express";


const router = Router();

router.get("/verify", (req, res) => {
  if (req.user) {
    res.send(true);
  } else {
    res.sendStatus(401);
  }
});

export default router;
