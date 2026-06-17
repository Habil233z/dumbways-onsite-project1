import { User } from "../interfaces/user.interfaces";

declare global {
    namespace Express {
        interface Request {
            user?: User
        }
    }
}