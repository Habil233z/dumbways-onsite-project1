import { Router } from "express";
import { authentication } from "../middlewares/authMiddleware";
import { AddLike, AddLikeReply, GetLikes, RemoveLike, RemoveLikeReply } from "../controllers/likeController";

const router = Router()

router.post("/add", authentication, AddLike)
router.post("/remove", authentication, RemoveLike)
router.post("/replyAdd", authentication, AddLikeReply)
router.post("/replyRemove", authentication, RemoveLikeReply)
router.get("/get", authentication, GetLikes)

export default router