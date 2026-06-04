import { Router } from "express";
import { GetPost } from "../controllers/postController";
import { authentication } from "../middlewares/authMiddleware";

const router = Router()

router.get("/get", authentication, GetPost)

export default router