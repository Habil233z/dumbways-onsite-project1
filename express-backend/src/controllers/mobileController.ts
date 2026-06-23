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
        const topPost = await prisma.threads.findMany({where: {creator_id: decoded.id}, include: {_count: {select: {likes: true, replies:true}}}, orderBy: {likes: {_count: "desc"}}, take: 15})
        return res.status(200).json({
            message: "Success",
            data: {topPost}
        })
    } catch (error) {
        console.log(error)
    }
}

export const latestActivities = async (req:Request, res:Response) => {
    const decoded:any = req.user
    try {
        const latestFollowers = await prisma.following.findMany({where: {following_id: decoded.id}, orderBy: {create_at: "desc"}, include: {follower: {omit: {password:true}}}, take: 15})
        const latestLikes = await prisma.likes.findMany({where: {thread_likes: {creator_id: decoded.id}}, orderBy:{created_at: "desc"}, include: {user_likes: {omit: {password:true}}}, take: 15})
        const latestReply = await prisma.replies.findMany({where: {threadReplied: {creator_id: decoded.id}}, orderBy: {created_at: "desc"}, include: {creator: {omit: {password: true}}}})

        const formattedFollowers = latestFollowers.map(f => ({
        id: `follow-${f.id}`,
        type: 'FOLLOW',
        user: f.follower,
        message: 'started following you',
        created_at: f.create_at
        }));

        const formattedLikes = latestLikes.map(l => ({
        id: `like-${l.id}`,
        type: 'LIKE',
        user: l.user_likes,
        message: `liked your thread`,
        created_at: l.created_at
        }));

        const formattedReplies = latestReply.map(r => ({
        id: `reply-${r.id}`,
        type: 'REPLY',
        user: r.creator,
        message: `replied to your thread`,
        created_at: r.created_at
        }));

        const combinedActivity = [...formattedFollowers, ...formattedLikes, ...formattedReplies];

        const finalFeed = combinedActivity.slice(0, 20);

        return res.status(200).json({
            message: "Success",
            data: finalFeed
        })
    } catch (error) {
        console.log(error)
    }
}