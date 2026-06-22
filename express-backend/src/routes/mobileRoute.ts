import { Router } from "express";
import { authentication } from "../middlewares/authMiddleware";
import { latestActivities, topPost, totalUserLikesAndPost } from "../controllers/mobileController";

const router = Router()

router.get("/count", authentication, totalUserLikesAndPost)
router.get("/topThreads", authentication, topPost)
router.get("/latestActivities", authentication, latestActivities)

export default router