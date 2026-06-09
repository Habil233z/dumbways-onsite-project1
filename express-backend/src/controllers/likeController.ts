import { prisma } from "../lib/prisma"
import type { Request, Response} from "express"

export const AddLike = async (req:Request, res:Response) => {
    try {
        const decoded = await req.user
        const user_id = decoded.id
        const created_by= decoded.username
        const {thread_id} = req.body
        const newLike = await prisma.likes.create({
            data: {
                user_id,
                thread_id,
                created_by
            }})
        return (
            res.status(201).json({
                message: "success like",
                data: {
                    user_id: newLike.user_id,
                    thread_id: newLike.thread_id,
                    created_by: newLike.created_by
        }}))
    } catch (error) {
        res.status(400).json({
        message: "fail to like"})
    }
}

export const RemoveLike = async (req:Request, res:Response) => {
    try {
        const decoded = req.user
        const user_id = decoded.id
        const created_by= decoded.username
        const {thread_id} = req.body
        const deleteLike = await prisma.likes.deleteMany({
            where: {
                user_id: user_id,
                thread_id: thread_id,
                created_by: created_by
            }})
        return (
            res.status(201).json({
                message: "success delete like",
            }))
    } catch (error) {
        
    }
}

export const AddLikeReply = async (req:Request, res:Response) => {
    try {
        const decoded = await req.user
        const user_id = decoded.id
        const created_by= decoded.username
        const {replie_id} = req.body
        const newLike = await prisma.likesReplies.create({
            data: {
                user_id,
                replie_id,
                created_by
            }})
        return (
            res.status(201).json({
                message: "success like",
                data: {
                    user_id: newLike.user_id,
                    replies_id: newLike.replie_id,
                    created_by: newLike.created_by
        }}))
    } catch (error) {
        res.status(400).json({
        message: "fail to like"})
    }
}

export const RemoveLikeReply = async (req:Request, res:Response) => {
    try {
        const decoded = req.user
        const user_id = decoded.id
        const created_by= decoded.username
        const {replie_id} = req.body
        const deleteLike = await prisma.likesReplies.deleteMany({
            where: {
                user_id: user_id,
                replie_id,
                created_by: created_by
            }})
        return (
            res.status(201).json({
                message: "success delete like",
            }))
    } catch (error) {
        res.status(400).json({
        message: "fail to remove like"})
    }
}

export const GetLikes = async (req:Request, res:Response) => {
    const decoded = req.user
    try {
        const likes = await prisma.likes.findMany({orderBy : {thread_id: "asc"}})
        return res.status(200).json({
            message: "Success get like data",
            data: {likes}
        })
    } catch (error) {
        res.status(400).json({
        message: "Fail to get like data"})
    }
}