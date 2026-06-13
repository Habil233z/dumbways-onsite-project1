import { Router } from "express";
import { CreatePost, CreateReply, getUserPost, GetPost, GetPostById, GetPostReply, deletePost, deletePostReply } from "../controllers/postController";
import { authentication } from "../middlewares/authMiddleware";
import { upload } from "../lib/multer";

const router = Router()

router.get("/get", authentication, GetPost)
router.post("/create", upload.single("file") ,authentication, CreatePost)
router.post("/createReply", upload.single("file") ,authentication, CreateReply)
router.get("/mainPost/:id", authentication, GetPostById)
router.get("/reply/:id", authentication, GetPostReply)
router.get("/getUserPost", authentication, getUserPost)
router.post("/delete", authentication, deletePost)
router.post("/deleteReply", authentication, deletePostReply)

export default router