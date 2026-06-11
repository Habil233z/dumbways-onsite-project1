import type { Request, Response} from "express"
import { prisma } from "../lib/prisma";

export const getFollowing = async (req: Request, res: Response) => {
    const decoded = req.user
    try {
        const following = await prisma.following.findMany({where: {follower_id: decoded.id}})
        const followings = following.map((request) => request.following_id)
        const userFollowed = await prisma.users.findMany({where: {id: {in: followings}}})
        return res.status(200).json({
            message: "Find user success",
            data: {userFollowed}
        })

    } catch (error) {
        
    }
}

export const getFollower = async (req: Request, res: Response) => {
    const decoded = req.user
    try {
        const follower = await prisma.following.findMany({where: {following_id: decoded.id}})
        const followers = follower.map((request) => request.follower_id)
        const userFollowing = await prisma.users.findMany({where: {id: {in: followers}}})
        return res.status(200).json({
            message: "Find user success",
            data: {userFollowing}
        })

    } catch (error) {
        
    }
}