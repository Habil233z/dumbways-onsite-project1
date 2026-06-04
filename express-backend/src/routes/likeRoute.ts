import { Router } from "express";
import { authentication } from "../middlewares/authMiddleware";
import { AddLike, RemoveLike } from "../controllers/likeController";

const router = Router()

router.post("/add", authentication, AddLike)
router.post("/remove", authentication, RemoveLike)

export default router