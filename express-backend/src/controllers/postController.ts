import { prisma } from "../lib/prisma"
import type { Request, Response} from "express"

export const GetPost = async (req: Request, res: Response) => {
    try {
        const decoded = req.user
        const post = await prisma.threads.findMany({orderBy : {created_at: "asc"}})
        const likes = await prisma.likes.findMany({orderBy : {created_at: "asc"}})
        return res.status(200).json({
            message: "Fetch successfull",
            data: {post, likes, decoded}
            })
    } catch (error) {
        console.log(error)
    }
}