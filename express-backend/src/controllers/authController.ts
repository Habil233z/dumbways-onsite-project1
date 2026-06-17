import type { Request, Response} from "express"
import bcrypt from "bcrypt"
import { prisma } from "../lib/prisma";
import jwt from "jsonwebtoken"

export const Register = async (req:Request, res:Response) => {
    try {
        const {username, full_name, email, password, bio} = await req.body
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const photo = req.file ? req.file.filename : ""
        const photo_profile = "http://localhost:3000/uploads/" + photo
        const newUser = await prisma.users.create({
            data: {
                username,
                full_name,
                email,
                photo_profile,
                password: hashedPassword,
                bio
            }
        })
        const user = await prisma.users.findFirst({where: {OR: [{email: email}, {username: username}]}});
        const token = jwt.sign({id:user?.id, username: user?.username, full_name: user?.full_name ,photo_profile: user?.photo_profile, email: user?.email}, process.env.SECRET_KEY as string, {
        expiresIn: '2 days'})
        return (
            res.status(201).json({
                message: "register successfull",
            data: {
                username: newUser.username,
                full_name: newUser.full_name,
                email: newUser.email,
                password: newUser.password,
                bio: newUser.bio
            },
            token, user
            })
        )
    } catch(error) {
        console.log(error)
    }
}

export const Login = async (req:Request, res:Response) => {
    try {
        const {emailOrUsername, password} = req.body

        const user = await prisma.users.findFirst({where: {OR: [{email: emailOrUsername}, {username: emailOrUsername}]}});
        const match = user ? await bcrypt.compare(password, user.password) : false
        if (!user || !match) {
            return res.status(404).json({
                message: "User not found or password wrong"
            })
        }
        const identity = {id:user.id, username: user.username, full_name: user.full_name, photo_profile: user.photo_profile, email: user.email}
        const token = jwt.sign({id:user.id, username: user.username, full_name: user.full_name, photo_profile: user.photo_profile, email: user.email}, process.env.SECRET_KEY as string, {
       expiresIn: '2 days'})
        res.status(200).json({
            message: "Success",
            token, identity
        })
    } catch (error) {
        console.log(error)
    }
}

export const getProfile = async (req: Request, res: Response) => {
    const decoded: any = req.user
    try {
        const data = await prisma.users.findUnique({where: {id: decoded.id}})
        const profile = {
            id: data?.id,
            username: data?.username,
            full_name: data?.full_name,
            email: data?.email,
            photo_profile: data?.photo_profile,
            bio: data?.bio,
            created_at: data?.created_at
        }
        return res.status(200).json({
            message: "GetPostReply Success",
            data: {profile}
        })
    } catch (error) {
        console.log(error)
    }
}

export const editProfile = async (req: Request, res: Response) => {
    const decoded: any = req.user
    try {
        const {username, full_name, bio} = await req.body
        const photo = req.file ? req.file.filename : ""
        const preparedPhoto = "http://localhost:3000/uploads/" + photo
        if (preparedPhoto === "http://localhost:3000/uploads/") {
            await prisma.users.update({
            where: {email: decoded.email},
            data: {
                username,
                full_name,
                bio
        }})} else {
            await prisma.users.update({
            where: {email: decoded.email},
            data: {
                username,
                full_name,
                bio,
                photo_profile: preparedPhoto
        }})} 
        
        const user = await prisma.users.findUnique({where: {email: decoded.email}});
        const identity = {id:user?.id, username: user?.username, full_name: user?.full_name, photo_profile: user?.photo_profile, email: user?.email}
        const token = jwt.sign({id:user?.id, username: user?.username, full_name: user?.full_name, photo_profile: user?.photo_profile, email: user?.email}, process.env.SECRET_KEY as string, {
        expiresIn: '2 days'});
        return res.status(201).json({
            message: "Profile successfully updated",
            data : {token, identity}
        })
    } catch (error) {
        console.log(error)
    }
}

export const DeleteAccount= async (req: Request, res: Response) => {
    const decoded: any = req.user
    try {
        await prisma.users.delete({where: {id: decoded.id}})
        return res.status(204).json({
            message: "Account has been deleted successfully"
        })
    } catch (error) {
        console.log(error)
    }
}