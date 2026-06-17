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
}}

export const CreatePost = async (req: Request, res: Response) => {
    const decoded: any = req.user
    const {content} = req.body
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
}}

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
}}

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
}}

export const CreateReply = async (req: Request, res: Response) => {
    const decoded: any = req.user
    const {content, thread_id} = req.body
    const threadId: number = Number(thread_id)
    try {
        const photo = req.file ? req.file.filename : ""
        const image = "http://localhost:3000/uploads/" + photo
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
}}

export const getUserPost = async (req: Request, res: Response) => {
    const decoded: any = req.user
    try {
        const userPost = await prisma.threads.findMany({where: {creator_id: decoded.id}, orderBy: {created_at: "asc"}})
        const userReply = await prisma.replies.findMany({where: {creator_id: decoded.id}, orderBy: {created_at: "asc"}})
        const replies = await prisma.replies.findMany({orderBy : {thread_id: "asc"}})
        const likesReply = await prisma.likesReplies.findMany({orderBy : {replie_id: "asc"}})
        return res.status(200).json({
            message: "Get personal status success",
            data: {userPost, userReply, decoded, replies, likesReply}
        })
    } catch (error) {
        console.log(error)
}}

export const deletePost = async (req: Request, res: Response) => {
    const decoded: any = req.user
    const {id} = req.body
    try {
        const deletePost = await prisma.threads.delete({where: {id: id, creator_id: decoded.id}})
        return res.status(201).json({
            message: "Post deleted successfully",
            data: {decoded}
        })
    } catch (error) {
        console.log(error)
}}

export const deletePostReply = async (req: Request, res: Response) => {
    const decoded: any = req.user
    const {id} = req.body
    try {
        const deletePostReply = await prisma.replies.delete({where: {id: id, creator_id: decoded.id}})
        return res.status(201).json({
            message: "Post deleted successfully",
            data: {decoded}
        })
    } catch (error) {
        console.log(error)
}}

export const EditPost = async (req: Request, res: Response) => {
    const decoded: any = req.user
    const {content, id} = req.body
    const threadId: number = Number(id)
    const imageName = req.file ? req.file.filename : ""
    const preparedImage = "http://localhost:3000/uploads/" + imageName
    try {
        if (preparedImage === "http://localhost:3000/uploads/") {
            const editedPost = await prisma.threads.update({
            where: {id: threadId, creator_id: decoded.id}, 
            data: {content: content}
        })} else {
            const editedPost = await prisma.threads.update({
            where: {id: threadId, creator_id: decoded.id}, 
            data: {content: content, image: preparedImage}
        })
        }
        return res.status(201).json({
            message: "data edited successfully"
        })
    } catch (error) {
        console.log(error)
    }
}

export const EditReply = async (req: Request, res: Response) => {
    const decoded: any = req.user
    const {content, id} = req.body
    const replyId: number = Number(id)
    const imageName = req.file ? req.file.filename : ""
    const preparedImage = "http://localhost:3000/uploads/" + imageName
    try {
        if (preparedImage === "http://localhost:3000/uploads/") {
            await prisma.replies.update({
            where: {id: replyId, creator_id: decoded.id}, 
            data: {content: content}
        })} else {
            await prisma.replies.update({
            where: {id: replyId, creator_id: decoded.id}, 
            data: {content: content, image: preparedImage}
        })
        }
        return res.status(201).json({
            message: "data edited successfully"
        })
    } catch (error) {
        console.log(error)
    }
}