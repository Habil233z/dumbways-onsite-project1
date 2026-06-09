import type { Request, Response} from "express"
import { prisma } from "../lib/prisma";

export const findUser = async (req: Request, res: Response) => {
    const {input} = req.body
    try {
        const searchedUser = await prisma.users.findMany({where: {username: {contains: input}}, omit: {password: true} ,orderBy:{created_at: "asc"}})
        console.log(searchedUser)
        return res.status(200).json({
            message: "Find user success",
            data: {searchedUser}
        })

    } catch (error) {
        
    }
}