import { Router } from "express";
import { authentication } from "../middlewares/authMiddleware";
import { latestFollower, topPost, totalUserLikesAndPost } from "../controllers/mobileController";

const router = Router()

router.get("/count", authentication, totalUserLikesAndPost)
router.get("/topThreads", authentication, topPost)
router.get("/latestFollower", authentication, latestFollower)

export default router