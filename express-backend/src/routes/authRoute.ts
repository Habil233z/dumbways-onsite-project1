import { Router } from "express";
import { editProfile, getProfile, Login, Register } from "../controllers/authController"
import { upload } from "../lib/multer";
import { authentication } from "../middlewares/authMiddleware";


const router = Router()

router.post("/register", upload.single("file"), Register)
router.post("/login", Login)
router.get("/getProfile", authentication, getProfile)
router.post("/editProfile", authentication, upload.single("file"), editProfile)

export default router