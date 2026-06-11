import { Router } from "express";
import authRoute from "./authRoute"
import postRoute from "./postRoute";
import likeRoute from "./likeRoute";
import userRoute from "./userRoute";
import followRoute from "./followRoute";

const router = Router()

router.use("/", authRoute)
router.use("/post", postRoute)
router.use("/like", likeRoute)
router.use("/user", userRoute)
router.use("/follow", followRoute)

export default router