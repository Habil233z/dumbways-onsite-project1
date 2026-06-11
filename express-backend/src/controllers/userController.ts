import type { Request, Response} from "express"
import { prisma } from "../lib/prisma";

export const findUser = async (req: Request, res: Response) => {
    const decoded = req.user
    const {input} = req.body
    try {
        const searchedUser = await prisma.users.findMany({where: {OR: [{username: {contains: input}}, {full_name: {contains: input}}]}, omit: {password: true} ,orderBy:{created_at: "asc"}})
        return res.status(200).json({
            message: "Find user success",
            data: {searchedUser, decoded}
        })

    } catch (error) {
        
    }
}