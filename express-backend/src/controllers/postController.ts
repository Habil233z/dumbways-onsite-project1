import { prisma } from "../lib/prisma"
import type { Request, Response} from "express"

export const GetPost = async (req: Request, res: Response) => {
    try {
        const post = await prisma.threads.findMany()
        return res.status(200).json({
            message: "Fetch successfull",
            data: {post}
            })
    } catch (error) {
        console.log(error)
    }
}