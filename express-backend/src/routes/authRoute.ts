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
 *   description: Create account and login it automaticaly. Will need all input inside form fill out to access it. Need username(string), full_name(string), photo_profile(from file converted to string later), email(string), and password(string). Will give token after this process finish.
 */
router.post("/register", upload.single("file"), Register)

/**
 * @openapi
 * /login: 
 *  post: 
 *   tags:
 *   - Auth
 *   description: Login using either username or email for top input, and password for lower input. Will give token after login.
 */
router.post("/login", Login)

/**
 * @openapi
 * /getProfile: 
 *  get: 
 *   tags:
 *   - Auth
 *   description: Get current user data using token as reference then put that data to react redux.
 */
router.get("/getProfile", authentication, getProfile)

/**
 * @openapi
 * /editProfile: 
 *  put: 
 *   tags:
 *   - Auth
 *   description: Edit user data with all inputed data on the page. Will give token again and change react redux data.
 */
router.put("/editProfile", authentication, upload.single("file"), editProfile)

/**
 * @openapi
 * /deleteProfile: 
 *  delete: 
 *   tags:
 *   - Auth
 *   description: Delete user data from database using token id as reference. Will remove token and return user to login page.
 */
router.delete("/deleteAccount", authentication, DeleteAccount)

export default router