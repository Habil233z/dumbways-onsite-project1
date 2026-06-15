import { Router } from "express";
import { authentication } from "../middlewares/authMiddleware";
import { findUser, findUserProfile, getOtherUserPost } from "../controllers/userController";


const router = Router()

router.post("/find", authentication, findUser)
router.get("/:id", authentication, findUserProfile)
router.get("/getOtherUserPost/:id", authentication, getOtherUserPost)

export default router