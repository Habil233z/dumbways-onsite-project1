import { Router } from "express";
import { CreatePost, CreateReply, getUserPost, GetPost, GetPostById, GetPostReply, deletePost, deletePostReply, EditPost, EditReply } from "../controllers/postController";
import { authentication } from "../middlewares/authMiddleware";
import { upload } from "../lib/multer";

const router = Router()

/**
 * @openapi
 * /post/get: 
 *  get: 
 *   tags:
 *   - Post
 *   description: Get all post(threads) from database. Use no reference.
 */
router.get("/get", authentication, GetPost)

/**
 * @openapi
 * /post/create: 
 *  post: 
 *   tags:
 *   - Post
 *   description: Create row on threads database. The content and image are set by user input.
 */
router.post("/create", upload.single("file") ,authentication, CreatePost)

/**
 * @openapi
 * /post/createReply: 
 *  post: 
 *   tags:
 *   - Post
 *   description: Create row on Reply database. The content and image are set by user input.
 */
router.post("/createReply", upload.single("file") ,authentication, CreateReply)

/**
 * @openapi
 * /post/mainPost/:id: 
 *  get: 
 *   tags:
 *   - Post
 *   description: Get specific post based on threads id. Use params id that set by thread as references.
 */
router.get("/mainPost/:id", authentication, GetPostById)

/**
 * @openapi
 * /post/reply/:id: 
 *  get: 
 *   tags:
 *   - Post
 *   description: Get specific reply based on reply id. Use params id that set by thread as references.
 */
router.get("/reply/:id", authentication, GetPostReply)

/**
 * @openapi
 * /post/getUserPost: 
 *  get: 
 *   tags:
 *   - Post
 *   description: Get all post that created by current user. Use token as references.
 */
router.get("/getUserPost", authentication, getUserPost)

/**
 * @openapi
 * /post/delete: 
 *  post: 
 *   tags:
 *   - Post
 *   description: Delete threads rows that contain correct id. Use thread id that is set by clicked post as reference.
 */
router.post("/delete", authentication, deletePost)

/**
 * @openapi
 * /post/deleteReply: 
 *  post: 
 *   tags:
 *   - Post
 *   description: Delete replies rows that contain correct id. Use replies id that is set by clicked reply as reference.
 */
router.post("/deleteReply", authentication, deletePostReply)

/**
 * @openapi
 * /post/edit: 
 *  post: 
 *   tags:
 *   - Post
 *   description: Edit row on threads database that contain the referenced threads id. Use token and threads id that set by clicked threads as references.
 */
router.put("/edit", upload.single("file"), authentication, EditPost)

/**
 * @openapi
 * /post/edit: 
 *  post: 
 *   tags:
 *   - Post
 *   description: Edit row on replies database that contain the referenced replies id. Use token and replies id that set by clicked threads as references.
 */
router.put("/editReply", upload.single("file"), authentication, EditReply)

export default router