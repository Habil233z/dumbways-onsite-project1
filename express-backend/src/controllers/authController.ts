import type { Request, Response} from "express"
import bcrypt from "bcrypt"
import { prisma } from "../lib/prisma";
import jwt from "jsonwebtoken"

export const Register = async (req:Request, res:Response) => {
    try {
        const {username, full_name, email, password, bio} = req.body

        

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = await prisma.users.create({
            data: {
                username,
                full_name,
                email,
                photo_profile: "test",
                password: hashedPassword,
                bio
            }
        })
        const token = jwt.sign({username: newUser.username, full_name: newUser.full_name }, process.env.SECRET_KEY as string, {
        expiresIn: '2 days',
        });
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
            token
            })
        )
    } catch(err) {
        res.json({
            message: "error"
        })
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
        const token = jwt.sign({username: user.username, full_name: user.full_name }, process.env.SECRET_KEY as string, {
       expiresIn: '2 days',
        });
        res.status(200).json({
            message: "Success",
            token
        })
    } catch (error) {
        console.log(error)
    }
}