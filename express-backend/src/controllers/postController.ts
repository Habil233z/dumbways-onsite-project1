import { prisma } from "../lib/prisma"
import type { Request, Response} from "express"

export const GetPost = async (req: Request, res: Response) => {
    const decoded = req.user
    try {
        const post = await prisma.threads.findMany({orderBy : {created_at: "asc"}})
        const likes = await prisma.likes.findMany({orderBy : {thread_id: "asc"}})
        const replies = await prisma.replies.findMany({orderBy : {thread_id: "asc"}})
        return res.status(200).json({
            message: "Fetch successfull",
            data: {post, likes, decoded, replies}
            })
    } catch (error) {
        console.log(error)
    }
}

export const CreatePost = async (req: Request, res: Response) => {
    const decoded = req.user
    const {content} = await req.body
    try {
        const photo = req.file ? req.file.filename : ""
        const image = "http://localhost:3000/uploads/" + photo
        const newPost = await prisma.threads.create({
            data: {
                content,
                image,
                created_by: decoded.username,
                creator_photo_profile: decoded.photo_profile,
                creator_id: decoded.id
            }
        })
        return res.status(201).json({
            message: "Post created successfully",
            data: {content: newPost.content, image: newPost.image, created_by: newPost.created_by, creator_photo_profile: newPost.creator_photo_profile}
        })
    } catch (error) {
        console.log(error)
    }
}

export const GetPostReply = async (req: Request, res: Response) => {
    const decoded = req.user
    const {id} = req.params
    const thread_id = Number(id)
    try {
        const postReply = await prisma.replies.findMany({where: {thread_id : thread_id}, orderBy: {created_at: "asc"}})
        const likesReply = await prisma.likesReplies.findMany({orderBy : {replie_id: "asc"}})
        return res.status(200).json({
            message: "GetPostReply Success",
            data: {postReply, decoded, likesReply}
        })
    } catch (error) {
        console.log(error)
    }
}

export const GetPostById = async (req: Request, res: Response) => {
    const decoded = req.user
    const {id} = req.params
    const thread_id = Number(id)
    try {
        const mainThread = await prisma.threads.findUnique({where: {id: thread_id}})
        const mainLike = await prisma.likes.findMany({where: {thread_id: thread_id}})
        return res.status(200).json({
            message: "GetPostReply Success",
            data: {mainThread, mainLike ,decoded}
        })
    } catch (error) {
        console.log(error)
    }
}

export const CreateReply = async (req: Request, res: Response) => {
    const decoded = req.user
    const {content, thread_id} = await req.body
    const threadId: number = Number(thread_id)
    try {
        const photo = req.file ? req.file.filename : ""
        const image = "http://localhost:3000/uploads/" + photo
        console.log("ran")
        const newReply = await prisma.replies.create({
            data: {
                thread_id: threadId,
                content,
                image,
                created_by: decoded.username,
                creator_photo_profile: decoded.photo_profile,
                creator_id: decoded.id
            }
        })
        return res.status(201).json({
            message: "Post created successfully",
            data: {content: newReply.content, image: newReply.image, created_by: newReply.created_by, creator_photo_profile: newReply.creator_photo_profile}
        })
    } catch (error) {
        console.log(error)
    }
}
