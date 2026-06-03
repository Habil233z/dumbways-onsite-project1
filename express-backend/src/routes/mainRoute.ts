import { Router } from "express";
import authRoute from "./authRoute"
import postRoute from "./postRoute";

const router = Router()

router.use("/", authRoute)
router.use("/", postRoute)

export default router