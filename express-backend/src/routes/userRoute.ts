import { Router } from "express";
import { authentication } from "../middlewares/authMiddleware";
import { findUser, findUserProfile, getOtherUserPostAndReply } from "../controllers/userController";


const router = Router()

router.post("/find", authentication, findUser)
router.get("/:id", authentication, findUserProfile)
router.get("/getOtherUserPostAndReply/:id", authentication, getOtherUserPostAndReply)

export default router