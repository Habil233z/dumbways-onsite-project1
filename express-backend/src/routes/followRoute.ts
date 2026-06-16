import { Router } from "express";
import { authentication } from "../middlewares/authMiddleware";
import { follow, getFollower, getFollowing, unFollow } from "../controllers/followController";


const router = Router()

/**
 * @openapi
 * /follow/getFollowing: 
 *  get: 
 *   tags:
 *   - Follow
 *   description: Get data that show whoever current user following. Use token as reference.
 */
router.get("/getFollowing", authentication, getFollowing)

/**
 * @openapi
 * /follow/getFollower: 
 *  get: 
 *   tags:
 *   - Follow
 *   description: Get data that show all user who currently follow current user. Use token as reference.
 */
router.get("/getFollower", authentication, getFollower)

/**
 * @openapi
 * /follow/unFollower: 
 *  post: 
 *   tags:
 *   - Follow
 *   description: Remove rows on database that contain current user as follower and specific user as following. Use token and id from unfollow button as references.
 */
router.post("/unFollow", authentication, unFollow)

/**
 * @openapi
 * /follow/follow: 
 *  post: 
 *   tags:
 *   - Follow
 *   description: Add rows on database that contain current user as follower and specific user as following. Use token and id from follow button as references.
 */
router.post("/follow", authentication, follow)

export default router