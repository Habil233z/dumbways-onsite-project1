import { Router } from "express";
import { Login, Register } from "../controllers/authController"
import { upload } from "../lib/multer";


const router = Router()

router.post("/register", upload.single("file"), Register)
router.post("/login", Login)

export default router