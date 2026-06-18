import { prisma } from "../lib/prisma"
import type { Request, Response} from "express"

export const totalUserLikesAndPost = async (req:Request, res:Response) => {
    const decoded: any = req.user
    try {
        const userPost = await prisma.threads.findMany({where: {creator_id: decoded.id}, include: {_count: {select: {likes: true, replies: true}}}})
        const totalLikes = userPost.reduce((total, current) => total as number + current._count.likes, 0)
        const totalReply = userPost.reduce((total, current) => total as number + current._count.replies, 0)
        const userReply = await prisma.replies.findMany({where: {creator_id: decoded.id}, include: {_count: {select: {likesReplies: true}}}})
        const totalReplyLikes = userReply.reduce((total, current) => total as number + current._count.likesReplies, 0)
        const totalFollower = await prisma.following.findMany({where: {following_id: decoded.id}})
            return res.status(200).json({
            message: "Success",
            data: {totalPost: userPost.length ,totalLikes, totalReply, totalReplyLikes, totalFollower: totalFollower.length}
        })
    } catch (error) {
        console.log(error)
    }
}

export const topPost = async (req:Request, res:Response) => {
    const decoded: any = req.user
    try {
        const topPost = await prisma.threads.findMany({where: {creator_id: decoded.id}, include: {_count: {select: {likes: true}}}, orderBy: {likes: {_count: "desc"}}, take: 5})
        return res.status(200).json({
            message: "Success",
            data: {topPost}
        })
    } catch (error) {
        console.log(error)
    }
}

export const latestFollower = async (req:Request, res:Response) => {
    const decoded:any = req.user
    try {
        const latestFollower = await prisma.following.findMany({where: {following_id: decoded.id}, orderBy: {create_at: "desc"}, include: {follower: true}, take: 5})
        return res.status(200).json({
            message: "Success",
            data: {latestFollower}
        })
    } catch (error) {
        console.log(error)
    }
}