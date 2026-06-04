import { Router } from "express";
import authRoute from "./authRoute"
import postRoute from "./postRoute";
import likeRoute from "./likeRoute";

const router = Router()

router.use("/", authRoute)
router.use("/post", postRoute)
router.use("/like", likeRoute)


export default router