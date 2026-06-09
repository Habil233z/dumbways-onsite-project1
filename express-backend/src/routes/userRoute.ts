import { Router } from "express";
import { authentication } from "../middlewares/authMiddleware";
import { findUser } from "../controllers/userController";


const router = Router()

router.post("/find", authentication, findUser)

export default router