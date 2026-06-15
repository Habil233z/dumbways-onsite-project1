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

export const findUserProfile = async (req: Request, res: Response) => {
    const decoded = req.user
    const {id} = req.params
    const userId: number = Number(id)
    try {
        const searchedUser = await prisma.users.findUnique({where: {id: userId}, omit: {password: true}})
        return res.status(200).json({
            message: "Find user success",
            data: {searchedUser, decoded}
        })

    } catch (error) {
        console.log(error)
    }
}

export const getOtherUserPost = async (req: Request, res: Response) => {
    const decoded = req.user
    const {id} = req.params
    const userId: number = Number(id)
    try {
        const userPost = await prisma.threads.findMany({where: {creator_id: userId}, orderBy: {created_at: "asc"}})
        const replies = await prisma.replies.findMany({orderBy : {thread_id: "asc"}})
        return res.status(200).json({
            message: "Get personal status success",
            data: {userPost, replies}
        })
    } catch (error) {
        console.log(error)
}}