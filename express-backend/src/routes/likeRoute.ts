import { Router } from "express";
import { authentication } from "../middlewares/authMiddleware";
import { AddLike, AddLikeReply, RemoveLike, RemoveLikeReply } from "../controllers/likeController";

const router = Router()

router.post("/add", authentication, AddLike)
router.post("/remove", authentication, RemoveLike)
router.post("/replyAdd", authentication, AddLikeReply)
router.post("/replyRemove", authentication, RemoveLikeReply)

export default router