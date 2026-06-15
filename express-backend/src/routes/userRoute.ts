import { Router } from "express";
import { authentication } from "../middlewares/authMiddleware";
import { findUser, findUserProfile, getOtherUserPostAndReply, recomendedUser } from "../controllers/userController";


const router = Router()

router.post("/find", authentication, findUser)
router.get("/:id", authentication, findUserProfile)
router.get("/getOtherUserPostAndReply/:id", authentication, getOtherUserPostAndReply)
router.get("/recomended/user", authentication, recomendedUser)

export default router