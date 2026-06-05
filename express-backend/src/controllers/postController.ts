import { prisma } from "../lib/prisma"
import type { Request, Response} from "express"

export const GetPost = async (req: Request, res: Response) => {
    try {
        const decoded = req.user
        const post = await prisma.threads.findMany({orderBy : {created_at: "asc"}})
        const likes = await prisma.likes.findMany({orderBy : {created_at: "asc"}})
        return res.status(200).json({
            message: "Fetch successfull",
            data: {post, likes, decoded}
            })
    } catch (error) {
        console.log(error)
    }
}

export const CreatePost = async (req: Request, res: Response) => {
    try {
        const decoded = req.user
        const {content} = await req.body
        const photo = req.file ? req.file.filename : ""
        const image = "http://localhost:3000/uploads/" + photo
        const newPost = await prisma.threads.create({
            data: {
                content,
                image,
                created_by: decoded.username,
                creator_photo_profile: decoded.photo_profile
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