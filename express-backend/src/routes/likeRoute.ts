import { Router } from "express";
import { authentication } from "../middlewares/authMiddleware";
import { AddLike, AddLikeReply, GetLikes, RemoveLike, RemoveLikeReply } from "../controllers/likeController";

const router = Router()

/**
 * @openapi
 * /like/add: 
 *  post: 
 *   tags:
 *   - Like
 *   description: Add rows on database that contain thread id and id of user who like that thread. Use token and id from like button as references.
 */
router.post("/add", authentication, AddLike)

/**
 * @openapi
 * /like/remove: 
 *  post: 
 *   tags:
 *   - Like
 *   description: Remove rows on database that contain thread id and id of user who like that thread. Use token and id from like button as references.
 */
router.post("/remove", authentication, RemoveLike)

/**
 * @openapi
 * /like/replyAdd: 
 *  post: 
 *   tags:
 *   - Like
 *   description: Add rows on database that contain reply id and id of user who like that reply. Use token and id from like button as references.
 */
router.post("/replyAdd", authentication, AddLikeReply)

/**
 * @openapi
 * /like/replyRemove: 
 *  post: 
 *   tags:
 *   - Like
 *   description: Remove rows on database that contain reply id and id of user who like that reply. Use token and id from like button as references.
 */
router.post("/replyRemove", authentication, RemoveLikeReply)

/**
 * @openapi
 * /like/get: 
 *  get: 
 *   tags:
 *   - Like
 *   description: Get all likes rows on like database.
 */
router.get("/get", authentication, GetLikes)

export default router