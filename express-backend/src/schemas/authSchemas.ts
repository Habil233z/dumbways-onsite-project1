/**
 * @openapi
 * components:
 *  schemas:
 *    RegisterUser:
 *     type: object
 *     required: 
 *       - username 
 *       - full_name
 *       - photo_profile
 *       - email
 *       - password
 *     properties:
 *       username: 
 *         type: string
 *         default: test
 *       full_name: 
 *         type: string
 *         default: tester
 *       photo_profile: 
 *         type: file
 *         default: e.target.files[0]
 *       email: 
 *         type: string
 *         default: test@gmail.com
 *       password: 
 *         type: string
 *         default: test
 */