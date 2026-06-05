import { Router } from "express";
import { CreatePost, GetPost } from "../controllers/postController";
import { authentication } from "../middlewares/authMiddleware";
import { upload } from "../lib/multer";

const router = Router()

router.get("/get", authentication, GetPost)
router.post("/create", upload.single("file") ,authentication, CreatePost)

export default router