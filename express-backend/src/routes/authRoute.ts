import { Router } from "express";
import { DeleteAccount, editProfile, getProfile, Login, Register } from "../controllers/authController"
import { upload } from "../lib/multer";
import { authentication } from "../middlewares/authMiddleware";


const router = Router()

/**
 * @openapi
 * /register: 
 *  post: 
 *   tags:
 *   - Auth
 *   description: Create account and login it automaticaly. Will need all input inside form fill out to access it.
 *   requestBody: 
 *     required: true
 *     contents: 
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/RegisterUser'
 *   responses: 
 * 200: 
 * description: test
 */
router.post("/register", upload.single("file"), Register)
router.post("/login", Login)

/**
 * @openapi
 * /getProfile: 
 *  get: 
 *   tags:
 *   - Auth
 *   description: Response
 *   responses: 
 * 200: 
 * description: test
 */
router.get("/getProfile", authentication, getProfile)
router.put("/editProfile", authentication, upload.single("file"), editProfile)
router.delete("/deleteAccount", authentication, DeleteAccount)

export default router