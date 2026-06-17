import { NextFunction } from "express";
import jwt from "jsonwebtoken"
import type { Request, Response} from "express"

export const authentication = (req: Request, res: Response, next:NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        try { 
            const decoded: any = jwt.verify(token as string, process.env.SECRET_KEY as string)
            req.user = decoded
            next()
    }   catch (error) {
            console.log("Not Authorized")
            res.status(400).json({
                message: "Not authorized"
            })
    }
    } catch (error) {
        console.log(error)
    }
    

}
