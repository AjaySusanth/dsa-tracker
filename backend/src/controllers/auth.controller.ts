import { Request,Response } from "express"
import * as AuthService from '../services/auth.service'

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true, 
  sameSite: 'none' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

export const register = async(req: Request,res:Response) => {
    const {name,email,password} = req.body
    try {
        const {user,token} = await AuthService.register(name,email,password)
        res
        .cookie('token',token,COOKIE_OPTIONS)
        .status(201)
        .json({success:true, user:{id: user.id,name:user.name, email: user.email},token})
 
    } catch (err:unknown) {

        if (err instanceof Error){
            console.error(err.message)
            res.status(400).json({success:false,message:err.message})
        }
        else{
            console.log("Unknown error")
            res.status(500).json({success:false,message:"Unexpected server error"})
        }
    }

}

export const login = async(req: Request,res:Response) => {
    const {email,password} = req.body
    try {

        const {user,token} = await AuthService.login(email,password)
        res
        .cookie('token',token,COOKIE_OPTIONS)
        .status(200)
        .json({success:true, user:{id: user.id, email: user.email},token})
 
    } catch (err:unknown) {

        if (err instanceof Error){
            console.error(err.message)
            res.status(400).json({success:false,message:err.message})
        }
        else{
            console.log("Unknown error")
            res.status(500).json({success:false,message:"Unexpected server error"})
        }
    }

}

export const logout = async(req: Request,res:Response) =>{
    try {
        res.clearCookie('token',COOKIE_OPTIONS)
        res.status(200).json({success:true,message:"Logged out successfully"})
    } catch (err:unknown) {
        if (err instanceof Error){
            console.error(err.message)
            res.status(400).json({success:false,message:err.message})
        }
        else{
            console.log("Unknown error")
            res.status(500).json({success:false,message:"Unexpected server error"})
        }
    }
}

export const getUser = async(req:Request, res:Response) => {
    try {
        const userId = (req as any).user.userId

        const user  = await AuthService.getUser(userId)
        if (!user) {
            res.status(404).json({success:false,message:"User not found"})
            return
        }
        res.status(200).json({success:true,user,message:"User fetched successfully"})
    } catch (err:unknown) {

        if (err instanceof Error){
            console.error(err.message)
            res.status(400).json({success:false,message:err.message})
        }
        else{
            console.log("Unknown error")
            res.status(500).json({success:false,message:"Unexpected server error"})
        }
    }
}