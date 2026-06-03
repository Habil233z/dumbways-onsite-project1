import { Router } from "express";
import { GetPost } from "../controllers/postController";
import { authentication } from "../middlewares/authMiddleware";

const router = Router()

router.get("/post", authentication, GetPost)

export default router