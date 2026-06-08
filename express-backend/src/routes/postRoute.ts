import { Router } from "express";
import { CreatePost, GetPost, GetPostById, GetPostReply } from "../controllers/postController";
import { authentication } from "../middlewares/authMiddleware";
import { upload } from "../lib/multer";

const router = Router()

router.get("/get", authentication, GetPost)
router.post("/create", upload.single("file") ,authentication, CreatePost)
router.get("/mainPost/:id", authentication, GetPostById)
router.get("/reply/:id", authentication, GetPostReply)

export default router