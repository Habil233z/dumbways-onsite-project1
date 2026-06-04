import { NextFunction } from "express";
import jwt from "jsonwebtoken"
import type { Request, Response} from "express"

export const authentication = (req: Request, res: Response, next:NextFunction) => {
    const token = req.headers.authorization.split(' ')[1]
    try {
        (req as any).user
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string)
        req.user = decoded
        next()
    } catch (error) {
        console.log("Not Authorized")
    }
}
