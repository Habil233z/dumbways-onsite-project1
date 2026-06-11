import { Router } from "express";
import { authentication } from "../middlewares/authMiddleware";
import { getFollower, getFollowing } from "../controllers/followController";


const router = Router()

router.get("/getFollowing", authentication, getFollowing)
router.get("/getFollower", authentication, getFollower)

export default router