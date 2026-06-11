import { Router } from "express";
import { authentication } from "../middlewares/authMiddleware";
import { follow, getFollower, getFollowing, unFollow } from "../controllers/followController";


const router = Router()

router.get("/getFollowing", authentication, getFollowing)
router.get("/getFollower", authentication, getFollower)
router.post("/unFollow", authentication, unFollow)
router.post("/follow", authentication, follow)

export default router