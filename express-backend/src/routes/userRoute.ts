import { Router } from "express";
import { authentication } from "../middlewares/authMiddleware";
import { findUser, findUserProfile, getOtherUserPostAndReply, recomendedUser } from "../controllers/userController";


const router = Router()

/**
 * @openapi
 * /user/find: 
 *  post: 
 *   tags:
 *   - User
 *   description: Find all user whos username or full_name on database match inputed data. Rely on input on search page as reference.
 */
router.post("/find", authentication, findUser)

/**
 * @openapi
 * /user/:id: 
 *  get: 
 *   tags:
 *   - User
 *   description: Get specific user based on their id. Rely on params that set by the button on front end.
 */
router.get("/:id", authentication, findUserProfile)

/**
 * @openapi
 * /user/getOtherUserPostAndReply/:id": 
 *  get: 
 *   tags:
 *   - User
 *   description: Get specific user post and reply based on their id. Rely on params that set by the button on front end.
 */
router.get("/getOtherUserPostAndReply/:id", authentication, getOtherUserPostAndReply)

/**
 * @openapi
 * /user/recomended/user: 
 *  get: 
 *   tags:
 *   - User
 *   description: Get all user for recomended user. doesn't use and reference.
 */
router.get("/recomended/user", authentication, recomendedUser)

export default router