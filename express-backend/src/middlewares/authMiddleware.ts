import { NextFunction } from "express";
import jwt from "jsonwebtoken"
import type { Request, Response} from "express"

export const authentication = (req: Request, res: Response, next:NextFunction) => {
    const token = req.headers.authorization.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string)
        next()
    } catch (error) {
        console.log("Not Authorized")
    }
}
